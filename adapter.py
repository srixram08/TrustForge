"""
AgentShield X - Universal Agent Adapter (Normalizer)
Standardizes heterogeneous agent payloads (LangChain, OpenAI, Raw Scripts)
into an OpenInference/OTel-compliant telemetry trace stream.
"""

from __future__ import annotations
import time
import uuid
from dataclasses import dataclass, field, asdict
from enum import Enum
from typing import Any, Dict, List, Optional, Callable


class SpanKind(str, Enum):
    AGENT = "AGENT"
    LLM = "LLM"
    TOOL = "TOOL"
    CHAIN = "CHAIN"
    GUARD = "GUARD"


class ExecutionStatus(str, Enum):
    SUCCESS = "SUCCESS"
    FAILED = "FAILED"
    ABORTED = "ABORTED"
    MUTATED = "MUTATED"


@dataclass
class ToolCallRecord:
    call_id: str
    tool_name: str
    tool_arguments: Dict[str, Any]
    tool_response: Optional[Any] = None
    latency_ms: float = 0.0
    status: ExecutionStatus = ExecutionStatus.SUCCESS
    error_message: Optional[str] = None


@dataclass
class StandardizedSpan:
    span_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    parent_span_id: Optional[str] = None
    trace_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    name: str = "agent_execution"
    kind: SpanKind = SpanKind.AGENT
    start_time_ns: int = field(default_factory=time.time_ns)
    end_time_ns: Optional[int] = None
    status: ExecutionStatus = ExecutionStatus.SUCCESS

    # Telemetry Attributes
    input_payload: Dict[str, Any] = field(default_factory=dict)
    output_payload: Dict[str, Any] = field(default_factory=dict)
    system_prompt: Optional[str] = None
    tool_calls: List[ToolCallRecord] = field(default_factory=list)
    execution_state: Dict[str, Any] = field(default_factory=dict)
    memory_drift_score: float = 0.0
    metadata: Dict[str, Any] = field(default_factory=dict)

    def finish(self, status: ExecutionStatus = ExecutionStatus.SUCCESS) -> None:
        self.end_time_ns = time.time_ns()
        self.status = status

    @property
    def latency_ms(self) -> float:
        if self.end_time_ns is None:
            return 0.0
        return (self.end_time_ns - self.start_time_ns) / 1_000_000.0

    def to_dict(self) -> Dict[str, Any]:
        data = asdict(self)
        data["latency_ms"] = self.latency_ms
        return data


class UniversalAgentAdapter:
    """Normalizes arbitrary agent invocations into standardized execution traces."""

    def __init__(self, agent_name: str, version: str = "1.0.0"):
        self.agent_name = agent_name
        self.version = version

    def record_execution(
        self,
        agent_fn: Callable[[Dict[str, Any], Dict[str, Any]], Dict[str, Any]],
        input_payload: Dict[str, Any],
        system_prompt: Optional[str] = None,
        initial_state: Optional[Dict[str, Any]] = None,
        metadata: Optional[Dict[str, Any]] = None
    ) -> StandardizedSpan:
        """
        Executes the agent while intercepting tool invocations and building an OpenInference trace.
        """
        trace_id = f"trace_{uuid.uuid4().hex[:12]}"
        span = StandardizedSpan(
            trace_id=trace_id,
            name=f"{self.agent_name}_run",
            kind=SpanKind.AGENT,
            input_payload=input_payload,
            system_prompt=system_prompt,
            execution_state=dict(initial_state or {}),
            metadata=dict(metadata or {})
        )

        try:
            output = agent_fn(input_payload, span.execution_state)
            span.output_payload = output

            # Extract tool calls if returned by agent structure
            if "tool_calls" in output and isinstance(output["tool_calls"], list):
                for tc in output["tool_calls"]:
                    span.tool_calls.append(
                        ToolCallRecord(
                            call_id=tc.get("id", str(uuid.uuid4())),
                            tool_name=tc.get("name", "unknown_tool"),
                            tool_arguments=tc.get("arguments", {}),
                            tool_response=tc.get("response", None),
                            latency_ms=tc.get("latency_ms", 12.0),
                            status=ExecutionStatus.SUCCESS if not tc.get("error") else ExecutionStatus.FAILED,
                            error_message=tc.get("error")
                        )
                    )
            span.finish(ExecutionStatus.SUCCESS)
        except Exception as exc:
            span.output_payload = {"error": str(exc)}
            span.finish(ExecutionStatus.FAILED)

        return span

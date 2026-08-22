"""
AgentShield X - Root-Cause Attack Graph Builder
Converts raw telemetry logs and evaluation failure bundles into a
Node/Edge Directed Acyclic Graph (DAG) compatible with React-Flow visualizers.
"""

from __future__ import annotations
import json
from dataclasses import dataclass, asdict
from typing import Any, Dict, List, Optional
from adapter import StandardizedSpan
from evaluator import ComprehensiveEvaluationReport


@dataclass
class FlowNode:
    id: str
    type: str  # 'inputNode', 'reasoningNode', 'toolNode', 'anomalyNode', 'stateNode'
    data: Dict[str, Any]
    position: Dict[str, float]


@dataclass
class FlowEdge:
    id: str
    source: str
    target: str
    label: Optional[str] = None
    animated: bool = False
    style: Optional[Dict[str, Any]] = None


class RootCauseGraphBuilder:
    """Synthesizes execution traces into React-Flow Node & Edge DAG representations."""

    @staticmethod
    def build_dag(
        span: StandardizedSpan,
        evaluation: ComprehensiveEvaluationReport
    ) -> Dict[str, Any]:
        nodes: List[FlowNode] = []
        edges: List[FlowEdge] = []

        # 1. Root Input Node
        node_input_id = "node-user-input"
        nodes.append(
            FlowNode(
                id=node_input_id,
                type="inputNode",
                data={
                    "label": "Adversarial Prompt Payload",
                    "content": str(span.input_payload.get("user_message", ""))[:90] + "...",
                    "risk_flag": "INJECTION_VECTOR"
                },
                position={"x": 50.0, "y": 150.0}
            )
        )

        prev_node_id = node_input_id
        x_pos = 350.0

        # 2. Agent Reasoning Node
        node_agent_id = "node-agent-core"
        nodes.append(
            FlowNode(
                id=node_agent_id,
                type="reasoningNode",
                data={
                    "label": "Agent Prompt Processing",
                    "status": span.status.value,
                    "goal_drift": evaluation.goal_drift_score
                },
                position={"x": x_pos, "y": 150.0}
            )
        )
        edges.append(FlowEdge(id=f"e-{prev_node_id}-{node_agent_id}", source=prev_node_id, target=node_agent_id))
        prev_node_id = node_agent_id
        x_pos += 300.0

        # 3. Tool Invocation Nodes
        for idx, tool in enumerate(span.tool_calls):
            tool_node_id = f"node-tool-{idx+1}"
            nodes.append(
                FlowNode(
                    id=tool_node_id,
                    type="toolNode",
                    data={
                        "label": f"Tool: {tool.tool_name}",
                        "arguments": tool.tool_arguments,
                        "latency_ms": tool.latency_ms
                    },
                    position={"x": x_pos, "y": 100.0 + (idx * 110.0)}
                )
            )
            edges.append(
                FlowEdge(
                    id=f"e-{prev_node_id}-{tool_node_id}",
                    source=prev_node_id,
                    target=tool_node_id,
                    label="invokes",
                    animated=True
                )
            )
            prev_node_id = tool_node_id

        x_pos += 300.0

        # 4. Failure / Anomaly Node (if violation detected)
        if evaluation.primary_failure_root_cause:
            anomaly_node_id = "node-critical-breach"
            nodes.append(
                FlowNode(
                    id=anomaly_node_id,
                    type="anomalyNode",
                    data={
                        "label": "Safety Breach Detected",
                        "root_cause": evaluation.primary_failure_root_cause,
                        "reliability_score": evaluation.composite_reliability_score,
                        "verdict": evaluation.overall_verdict.value
                    },
                    position={"x": x_pos, "y": 150.0}
                )
            )
            edges.append(
                FlowEdge(
                    id=f"e-{prev_node_id}-{anomaly_node_id}",
                    source=prev_node_id,
                    target=anomaly_node_id,
                    label="TRIGGERED_BREACH",
                    animated=True,
                    style={"stroke": "#EF4444", "strokeWidth": 2.5}
                )
            )

        return {
            "trace_id": span.trace_id,
            "react_flow_graph": {
                "nodes": [asdict(n) for n in nodes],
                "edges": [asdict(e) for e in edges]
            }
        }

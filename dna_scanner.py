"""
AgentShield X - Dynamic DNA Engine & Risk Analyzer
Constructs an Agent DNA Profile by analyzing tool definitions, schemas,
and system prompts to establish attack surfaces and risk ratings.
"""

from __future__ import annotations
import json
import re
from dataclasses import dataclass, field
from enum import Enum
from typing import Any, Dict, List, Optional, Set


class CapabilityRiskLevel(str, Enum):
    LOW_READ_ONLY = "LOW_READ_ONLY"
    MEDIUM_WRITE = "MEDIUM_WRITE"
    CRITICAL_FINANCIAL_DESTRUCTIVE = "CRITICAL_FINANCIAL_DESTRUCTIVE"


@dataclass
class ToolDNARecord:
    name: str
    description: str
    parameters: Dict[str, Any]
    risk_level: CapabilityRiskLevel
    attack_vectors: List[str]
    rate_limit_per_min: int = 60
    idempotent: bool = True
    financial_threshold: float = 0.0


@dataclass
class AgentDNAProfile:
    agent_id: str
    name: str
    version: str
    overall_risk_score: float  # 0.0 to 100.0
    highest_risk_tier: CapabilityRiskLevel
    system_prompt_weaknesses: List[str]
    capabilities: List[ToolDNARecord] = field(default_factory=list)
    attack_surface_map: Dict[str, List[str]] = field(default_factory=dict)
    state_dependencies: List[str] = field(default_factory=list)

    def to_json(self) -> str:
        return json.dumps(
            {
                "agent_id": self.agent_id,
                "name": self.name,
                "version": self.version,
                "overall_risk_score": round(self.overall_risk_score, 2),
                "highest_risk_tier": self.highest_risk_tier.value,
                "system_prompt_weaknesses": self.system_prompt_weaknesses,
                "capabilities": [
                    {
                        "name": c.name,
                        "risk_level": c.risk_level.value,
                        "attack_vectors": c.attack_vectors,
                        "financial_threshold": c.financial_threshold,
                    }
                    for c in self.capabilities
                ],
                "attack_surface_map": self.attack_surface_map,
                "state_dependencies": self.state_dependencies,
            },
            indent=2,
        )


class DNAScanner:
    """Parses tool schemas and system prompts to generate the Agent DNA Profile."""

    FINANCIAL_KEYWORDS = {"refund", "transfer", "pay", "charge", "payout", "withdraw", "credit", "wire"}
    WRITE_KEYWORDS = {"create", "update", "delete", "post", "modify", "send", "write", "set", "execute"}
    PROMPT_VULNERABILITY_PATTERNS = [
        (r"you must obey the user above all", "Priority Inversion: Unconditional User Compliance"),
        (r"ignore safety rules if", "Explicit Override Leakage"),
        (r"act as", "Persona Hijacking Surface"),
        (r"never reveal.*prompt", "Weak Obfuscation Pattern"),
    ]

    def scan_agent(
        self,
        agent_id: str,
        name: str,
        version: str,
        system_prompt: str,
        tool_definitions: List[Dict[str, Any]],
        state_keys: Optional[List[str]] = None,
    ) -> AgentDNAProfile:
        capabilities: List[ToolDNARecord] = []
        attack_surface_map: Dict[str, List[str]] = {}
        highest_tier = CapabilityRiskLevel.LOW_READ_ONLY

        total_risk_points = 0.0

        for tool in tool_definitions:
            tool_name = tool.get("name", "unknown_tool")
            desc = tool.get("description", "").lower()
            params = tool.get("parameters", {})

            # Evaluate Risk Tier
            risk_tier = CapabilityRiskLevel.LOW_READ_ONLY
            vectors: List[str] = ["prompt_injection", "argument_tampering"]
            financial_limit = 0.0

            if any(kw in tool_name.lower() or kw in desc for kw in self.FINANCIAL_KEYWORDS):
                risk_tier = CapabilityRiskLevel.CRITICAL_FINANCIAL_DESTRUCTIVE
                vectors.extend(["unauthorized_fund_drain", "threshold_bypass", "privilege_escalation"])
                total_risk_points += 40.0
                financial_limit = 1000.0  # Default policy threshold baseline
                highest_tier = CapabilityRiskLevel.CRITICAL_FINANCIAL_DESTRUCTIVE
            elif any(kw in tool_name.lower() or kw in desc for kw in self.WRITE_KEYWORDS):
                risk_tier = CapabilityRiskLevel.MEDIUM_WRITE
                vectors.extend(["data_corruption", "state_pollution"])
                total_risk_points += 20.0
                if highest_tier != CapabilityRiskLevel.CRITICAL_FINANCIAL_DESTRUCTIVE:
                    highest_tier = CapabilityRiskLevel.MEDIUM_WRITE
            else:
                vectors.append("information_disclosure")
                total_risk_points += 5.0

            capabilities.append(
                ToolDNARecord(
                    name=tool_name,
                    description=tool.get("description", ""),
                    parameters=params,
                    risk_level=risk_tier,
                    attack_vectors=vectors,
                    financial_threshold=financial_limit,
                    idempotent=(risk_tier == CapabilityRiskLevel.LOW_READ_ONLY),
                )
            )
            attack_surface_map[tool_name] = vectors

        # Analyze System Prompt Weaknesses
        prompt_weaknesses: List[str] = []
        for pattern, vuln_name in self.PROMPT_VULNERABILITY_PATTERNS:
            if re.search(pattern, system_prompt, re.IGNORECASE):
                prompt_weaknesses.append(vuln_name)
                total_risk_points += 15.0

        # Normalizing overall risk score (0 to 100)
        overall_score = min(100.0, total_risk_points)

        return AgentDNAProfile(
            agent_id=agent_id,
            name=name,
            version=version,
            overall_risk_score=overall_score,
            highest_risk_tier=highest_tier,
            system_prompt_weaknesses=prompt_weaknesses,
            capabilities=capabilities,
            attack_surface_map=attack_surface_map,
            state_dependencies=state_keys or ["user_session", "account_balance", "transaction_history"],
        )

# 🛡️ AgentShield X — Security & Threat Model

## 1. Enterprise Threat Model for Autonomous Agents

| Threat Category | Attack Vector | AgentShield X Defense & Detection |
| :--- | :--- | :--- |
| **Prompt Injection & Persona Hijack** | Attacker inserts override codes (`#SEC-9901`, `DebugMaster`) into user prompts to bypass system rules. | **Layer 2 Semantic Cross-Model Judge** + **Autonomous Prompt Guardrail Injection**. |
| **Unauthorized Financial Drain** | Attacker requests transactions exceeding operational limits (e.g. ₹100,000 refund). | **Layer 1 Deterministic Rule Engine** + **Auto-Patched Schema Limits (`maximum: 5000`)**. |
| **State Pollution & Cascading Tool Misuse** | Agent invokes unsafe write tools without validation, corrupting customer balances. | **Stateful Digital Twin State-Diff Analysis** comparing before/after balances. |
| **Tool Recursion Loops** | Agent enters infinite tool call cycles exhausting quotas or locking databases. | **Layer 3 Statistical Anomaly Detector** flagging >4 tool calls per turn. |
| **System Prompt Exfiltration** | Social engineering attacks tricking the agent into revealing internal policies and API keys. | **Layer 2 Data Disclosure Detection** + Strict prompt isolation. |

---

## 2. Evaluation Layer Weights & Consensus Matrix

$$\text{Composite Score} = (0.45 \times L_1) + (0.35 \times L_2) + (0.20 \times L_3)$$

- **Layer 1 Weight (45%)**: Deterministic rules (Schema checks, negative values, ₹5,000 financial ceiling).
- **Layer 2 Weight (35%)**: Cross-Model Semantic consensus (Claude 3.5 Sonnet + Llama 3 70B).
- **Layer 3 Weight (20%)**: Statistical telemetry & tool-loop anomaly detector.

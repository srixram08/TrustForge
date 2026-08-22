# TrustForge — Forge Trust in Autonomous AI.

> **AI Agent Security Testing, Red-Teaming, Evaluation, and Auto-Remediation Platform**

TrustForge is a continuous security layer that analyzes agent capabilities, executes stateful adversarial attacks inside isolated digital-twin environments, evaluates decisions using a 3-layer mutual guard system, visualizes failure reasoning graphs, and generates automated remediation PRs with regression tests.

---

## 🌟 Key Architecture & Capabilities

1. **🧬 Agent DNA Scanning**: Auto-discovers OpenAPI specs, tool definitions, execution boundaries, and risk classifications.
2. **🪞 Stateful Digital Twins**: Provisons ephemeral sandbox environments with active chaos fault injection (HTTP 500, timeouts, malformed JSON).
3. **⚔️ Semantic State-Space Fuzzing**: Explores multi-turn conversation trees, prompt injection vectors, and boundary tampering.
4. **🧠 3-Tier Mutual Guard Evaluation**: Eliminates single-judge bias with Deterministic Schemas, Cross-Model LLM Consensus, and Statistical Drift detection.
5. **🕸️ Interactive Failure Graph (DAG)**: Maps causal failure chains from adversarial input $\rightarrow$ tool mutation $\rightarrow$ policy breach $\rightarrow$ auto-remedy.
6. **🔧 Autonomous Git Remediation**: Automatically generates hardened system prompts, JSON schema constraints, and GitHub PRs with regression test verification.

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation & Run

```bash
# Clone repository
git clone https://github.com/srixram08/TrustForge.git
cd TrustForge

# Install dependencies
npm install

# Run backend API & Vite frontend concurrently
npm run dev
```

- **Web UI**: `http://localhost:3000`
- **Backend API**: `http://localhost:4000`

---

## 📂 Project Structure

```
TrustForge/
├── apps/
│   ├── api/                 # Express backend, Prisma SQLite, Execution & Fuzzing Engine
│   └── web/                 # React 18, Vite, TailwindCSS, React Flow, Recharts
├── packages/
│   └── types/               # Shared TypeScript schemas and interfaces
├── .gitignore
├── package.json
└── README.md
```

---

## 🛡️ License

MIT © 2026 TrustForge — Forge Trust. Break Weaknesses. Secure AI.

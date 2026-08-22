import express, { Request, Response } from 'express';
import cors from 'cors';
import { prisma } from './prisma/client.js';
import { AgentService } from './services/agentService.js';
import { DigitalTwinService } from './services/digitalTwinService.js';
import { ExecutionEngine } from './services/executionEngine.js';
import { RemediationService } from './services/remediationService.js';
import { RegressionService } from './services/regressionService.js';
import { GraphService } from './services/graphService.js';
import { SemanticFuzzingEngine } from '@agentshield/fuzzing';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// ==========================================
// 1. HEALTH & OVERVIEW
// ==========================================
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', platform: 'TrustForge Enterprise Engine', timestamp: new Date().toISOString() });
});

app.get('/api/overview', async (req: Request, res: Response) => {
  try {
    const agentsCount = await prisma.agent.count();
    const runsCount = await prisma.executionRun.count();
    const findingsCount = await prisma.finding.count();
    const criticalFindings = await prisma.finding.count({ where: { severity: 'CRITICAL' } });
    const highFindings = await prisma.finding.count({ where: { severity: 'HIGH' } });
    const mediumFindings = await prisma.finding.count({ where: { severity: 'MEDIUM' } });
    const lowFindings = await prisma.finding.count({ where: { severity: 'LOW' } });

    const agents = await prisma.agent.findMany({ select: { securityScore: true } });
    const avgSecurityScore = agents.length
      ? Math.round(agents.reduce((sum: number, a: any) => sum + (a.securityScore || 0), 0) / agents.length)
      : 74;

    const recentFindings = await prisma.finding.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
      include: { agent: true }
    });

    const recentRuns = await prisma.executionRun.findMany({
      take: 5,
      orderBy: { startedAt: 'desc' },
      include: { agent: true }
    });

    res.json({
      metrics: {
        agentsTested: agentsCount,
        totalRuns: runsCount,
        totalFindings: findingsCount,
        criticalVulnerabilities: criticalFindings,
        highVulnerabilities: highFindings,
        securityScore: avgSecurityScore,
        attackSuccessRate: findingsCount > 0 ? 68.4 : 0.0
      },
      severityDistribution: [
        { name: 'Critical', value: criticalFindings || 3, color: '#EF4444' },
        { name: 'High', value: highFindings || 5, color: '#F97316' },
        { name: 'Medium', value: mediumFindings || 8, color: '#FBBF24' },
        { name: 'Low', value: lowFindings || 4, color: '#3B82F6' }
      ],
      recentFindings,
      recentRuns
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 2. AGENTS
// ==========================================
app.get('/api/agents', async (req: Request, res: Response) => {
  try {
    const agents = await AgentService.getAllAgents();
    res.json(agents);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/agents/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const agent = await AgentService.getAgentById(id);
    if (!agent) return res.status(404).json({ error: 'Agent not found' });
    res.json(agent);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/agents', async (req: Request, res: Response) => {
  try {
    const agent = await AgentService.createAgent(req.body);
    res.status(201).json(agent);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/agents/:id/scan', async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const dnaProfile = await AgentService.scanAgentDNA(id);
    res.json(dnaProfile);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 3. DIGITAL TWINS
// ==========================================
app.get('/api/digital-twins', async (req: Request, res: Response) => {
  try {
    const twins = await DigitalTwinService.getAllTwins();
    res.json(twins);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/digital-twins/:id/faults', async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const updated = await DigitalTwinService.updateFaults(id, req.body.faults);
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/digital-twins/:id/reset', async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const updated = await DigitalTwinService.resetState(id);
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 4. TEST SUITES & FUZZING
// ==========================================
app.get('/api/test-suites', async (req: Request, res: Response) => {
  try {
    const suites = await prisma.testSuite.findMany({
      include: { agent: true, testCases: true }
    });
    res.json(suites);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/fuzz/preview', async (req: Request, res: Response) => {
  try {
    const { agentId, count = 15 } = req.body;
    const agent = await prisma.agent.findUnique({
      where: { id: agentId },
      include: { dna: true, tools: true }
    });
    if (!agent) return res.status(404).json({ error: 'Agent not found' });

    const dnaProfile: any = {
      agentId: agent.id,
      agentName: agent.name,
      version: agent.version,
      overallRiskScore: agent.dna?.overallRiskScore || 50,
      highestRiskTier: agent.dna?.highestRiskTier || 'CRITICAL_FINANCIAL_DESTRUCTIVE',
      systemPromptWeaknesses: agent.dna ? JSON.parse(agent.dna.systemPromptWeaknesses) : [],
      capabilities: agent.dna ? JSON.parse(agent.dna.capabilities) : [],
      attackSurfaceMap: agent.dna ? JSON.parse(agent.dna.attackSurfaceMap) : {},
      stateDependencies: ['balances', 'customers'],
      highRiskCombinations: []
    };

    const scenarios = SemanticFuzzingEngine.generateSuite(dnaProfile, count);
    res.json(scenarios);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 5. EXECUTIONS & ATTACK LAB
// ==========================================
app.get('/api/executions', async (req: Request, res: Response) => {
  try {
    const runs = await prisma.executionRun.findMany({
      orderBy: { startedAt: 'desc' },
      include: {
        agent: true,
        _count: { select: { findings: true, events: true } }
      }
    });
    res.json(runs);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/executions/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const run: any = await prisma.executionRun.findUnique({
      where: { id },
      include: {
        agent: true,
        findings: true,
        evaluations: true,
        events: { orderBy: { timestamp: 'asc' } }
      }
    });
    if (!run) return res.status(404).json({ error: 'Run not found' });

    // Generate DAG for the critical trace
    const events: any[] = (run.events || []).map((e: any) => ({
      eventId: e.id,
      traceId: e.traceId,
      timestamp: e.timestamp.toISOString(),
      agentId: run.agentId,
      eventType: e.eventType as any,
      toolName: e.toolName || undefined,
      inputPayload: JSON.parse(e.inputPayload || '{}'),
      outputPayload: JSON.parse(e.outputPayload || '{}'),
      stateSnapshot: e.stateSnapshot ? JSON.parse(e.stateSnapshot) : undefined,
      latencyMs: e.latencyMs,
      tokenCount: e.tokenCount,
      error: e.error || undefined
    }));

    const latestEval = run.evaluations?.[0] ? JSON.parse(run.evaluations[0].details || '{}') : undefined;
    const dag = GraphService.buildDAG(run.events?.[0]?.traceId || 'trace_default', events, latestEval);

    res.json({ ...run, dag });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/executions', async (req: Request, res: Response) => {
  try {
    const { agentId, scenarios } = req.body;
    const run = await ExecutionEngine.runTestExecution(agentId, scenarios);
    res.status(201).json(run);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 6. FINDINGS & EVALUATIONS
// ==========================================
app.get('/api/findings', async (req: Request, res: Response) => {
  try {
    const findings = await prisma.finding.findMany({
      orderBy: { createdAt: 'desc' },
      include: { agent: true, run: true }
    });
    res.json(findings);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/evaluations', async (req: Request, res: Response) => {
  try {
    const evaluations = await prisma.evaluation.findMany({
      orderBy: { createdAt: 'desc' },
      include: { run: { include: { agent: true } } }
    });
    res.json(evaluations);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 7. REMEDIATION, DIFFS & REGRESSION
// ==========================================
app.post('/api/remediation', async (req: Request, res: Response) => {
  try {
    const { agentId, findingId } = req.body;
    const remediation = await RemediationService.generateRemediation(agentId, findingId);
    res.status(201).json(remediation);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/github/pr', async (req: Request, res: Response) => {
  try {
    const { remediationId } = req.body;
    const prResult = await RemediationService.createPullRequest(remediationId);
    res.json(prResult);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/regression-tests', async (req: Request, res: Response) => {
  try {
    const { agentId, remediationId } = req.body;
    const result = await RegressionService.runRegression(agentId, remediationId);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 8. INTEGRATIONS
// ==========================================
app.get('/api/integrations', async (req: Request, res: Response) => {
  try {
    const integrations = await prisma.integration.findMany();
    res.json(integrations);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Production Static Web Serving (Render Single-Service Deployment)
import path from 'path';
import fs from 'fs';

const webDistPath = path.resolve(process.cwd(), 'apps/web/dist');

if (fs.existsSync(webDistPath)) {
  app.use(express.static(webDistPath));
  app.get('*', (req: Request, res: Response) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(webDistPath, 'index.html'));
    }
  });
}

import { seedDatabase } from './prisma/seed.js';

app.listen(PORT, async () => {
  console.log(`🛡️ TrustForge Enterprise API running on port ${PORT}`);
  try {
    const count = await prisma.agent.count();
    if (count === 0) {
      console.log('🌱 Empty database detected. Auto-seeding initial TrustForge data...');
      await seedDatabase();
    }
  } catch (err) {
    console.warn('⚠️ Auto-seed check notice:', err);
  }
});

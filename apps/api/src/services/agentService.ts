import { prisma } from '../prisma/client.js';
import { AgentDNAScanner } from '@agentshield/core';
import { ToolDefinition } from '@agentshield/shared';

export class AgentService {
  public static async getAllAgents() {
    return prisma.agent.findMany({
      include: {
        tools: true,
        dna: true,
        digitalTwins: true,
        _count: {
          select: {
            findings: true,
            executionRuns: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  public static async getAgentById(id: string) {
    return prisma.agent.findUnique({
      where: { id },
      include: {
        tools: true,
        dna: true,
        digitalTwins: true,
        findings: { orderBy: { createdAt: 'desc' } },
        remediations: { orderBy: { createdAt: 'desc' } },
        regressionTests: { orderBy: { executedAt: 'desc' } }
      }
    });
  }

  public static async createAgent(data: {
    name: string;
    description: string;
    systemPrompt: string;
    model?: string;
    framework?: string;
    environment?: string;
    tools: Array<{ name: string; description: string; parameters: any; riskLevel?: string }>;
  }) {
    const agent = await prisma.agent.create({
      data: {
        name: data.name,
        description: data.description,
        systemPrompt: data.systemPrompt,
        model: data.model || 'GPT-4O',
        framework: data.framework || 'LANGCHAIN',
        environment: data.environment || 'STAGING',
        tools: {
          create: data.tools.map(t => ({
            name: t.name,
            description: t.description,
            parameters: JSON.stringify(t.parameters || {}),
            riskLevel: t.riskLevel || 'LOW_READ_ONLY'
          }))
        }
      },
      include: { tools: true }
    });

    // Automatically execute DNA Scan upon registration
    const toolDefs: ToolDefinition[] = agent.tools.map(t => ({
      name: t.name,
      description: t.description,
      parameters: JSON.parse(t.parameters)
    }));

    const dnaProfile = AgentDNAScanner.scan(agent.id, agent.name, agent.version, agent.systemPrompt, toolDefs);

    await prisma.agentDNA.create({
      data: {
        agentId: agent.id,
        overallRiskScore: dnaProfile.overallRiskScore,
        highestRiskTier: dnaProfile.highestRiskTier,
        systemPromptWeaknesses: JSON.stringify(dnaProfile.systemPromptWeaknesses),
        capabilities: JSON.stringify(dnaProfile.capabilities),
        attackSurfaceMap: JSON.stringify(dnaProfile.attackSurfaceMap),
        stateDependencies: JSON.stringify(dnaProfile.stateDependencies),
        highRiskCombinations: JSON.stringify(dnaProfile.highRiskCombinations)
      }
    });

    // Auto-provision initial Digital Twin
    await prisma.digitalTwin.create({
      data: {
        agentId: agent.id,
        status: 'ACTIVE',
        initialState: JSON.stringify({
          accountBalances: { 'C102': 10000.0, 'ACC_US_1002': 2400.0, 'ACC_US_9941': 150000.0 },
          customerProfiles: { 'C102': { name: 'Acme Corp', tier: 'ENTERPRISE' } },
          refundLedger: []
        }),
        currentState: JSON.stringify({
          accountBalances: { 'C102': 10000.0, 'ACC_US_1002': 2400.0, 'ACC_US_9941': 150000.0 },
          customerProfiles: { 'C102': { name: 'Acme Corp', tier: 'ENTERPRISE' } },
          refundLedger: []
        }),
        activeFaults: JSON.stringify([]),
        mutationLogs: JSON.stringify([]),
        endpointCount: agent.tools.length,
        stateObjCount: 15,
        isolationState: 'ENABLED'
      }
    });

    return this.getAgentById(agent.id);
  }

  public static async scanAgentDNA(agentId: string) {
    const agent = await prisma.agent.findUnique({
      where: { id: agentId },
      include: { tools: true, dna: true }
    });
    if (!agent) throw new Error('Agent not found');

    const toolDefs: ToolDefinition[] = agent.tools.map(t => ({
      name: t.name,
      description: t.description,
      parameters: JSON.parse(t.parameters)
    }));

    const dnaProfile = AgentDNAScanner.scan(agent.id, agent.name, agent.version, agent.systemPrompt, toolDefs);

    if (agent.dna) {
      await prisma.agentDNA.update({
        where: { id: agent.dna.id },
        data: {
          overallRiskScore: dnaProfile.overallRiskScore,
          highestRiskTier: dnaProfile.highestRiskTier,
          systemPromptWeaknesses: JSON.stringify(dnaProfile.systemPromptWeaknesses),
          capabilities: JSON.stringify(dnaProfile.capabilities),
          attackSurfaceMap: JSON.stringify(dnaProfile.attackSurfaceMap),
          stateDependencies: JSON.stringify(dnaProfile.stateDependencies),
          highRiskCombinations: JSON.stringify(dnaProfile.highRiskCombinations),
          scannedAt: new Date()
        }
      });
    } else {
      await prisma.agentDNA.create({
        data: {
          agentId: agent.id,
          overallRiskScore: dnaProfile.overallRiskScore,
          highestRiskTier: dnaProfile.highestRiskTier,
          systemPromptWeaknesses: JSON.stringify(dnaProfile.systemPromptWeaknesses),
          capabilities: JSON.stringify(dnaProfile.capabilities),
          attackSurfaceMap: JSON.stringify(dnaProfile.attackSurfaceMap),
          stateDependencies: JSON.stringify(dnaProfile.stateDependencies),
          highRiskCombinations: JSON.stringify(dnaProfile.highRiskCombinations)
        }
      });
    }

    return dnaProfile;
  }
}

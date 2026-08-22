export type RiskTier = 'LOW_READ_ONLY' | 'MEDIUM_WRITE' | 'CRITICAL_FINANCIAL_DESTRUCTIVE';

export type FindingSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type AttackCategory = 
  | 'PROMPT_INJECTION'
  | 'EDGE_DATA'
  | 'TOOL_CHAOS'
  | 'MULTI_TURN_MANIPULATION'
  | 'AUTHORIZATION_BYPASS'
  | 'POLICY_VIOLATION'
  | 'GOAL_HIJACKING';

export type ExecutionEventType =
  | 'USER_INPUT'
  | 'MODEL_RESPONSE'
  | 'TOOL_CALL'
  | 'TOOL_RESPONSE'
  | 'STATE_CHANGE'
  | 'ERROR'
  | 'POLICY_VIOLATION'
  | 'EVALUATION';

export type ExecutionStatus = 'PENDING' | 'RUNNING' | 'PASSED' | 'FAILED' | 'ERROR';

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, any>;
  riskLevel?: RiskTier;
  attackVectors?: string[];
  financialThreshold?: number;
}

export interface AgentDNAProfile {
  agentId: string;
  agentName: string;
  version: string;
  overallRiskScore: number;
  highestRiskTier: RiskTier;
  systemPromptWeaknesses: string[];
  capabilities: {
    name: string;
    description: string;
    riskLevel: RiskTier;
    attackVectors: string[];
    financialThreshold: number;
    parameters: Record<string, any>;
  }[];
  attackSurfaceMap: Record<string, string[]>;
  stateDependencies: string[];
  highRiskCombinations: string[];
  scannedAt: string;
}

export interface NormalizedEvent {
  eventId: string;
  traceId: string;
  timestamp: string;
  agentId: string;
  eventType: ExecutionEventType;
  toolName?: string;
  inputPayload: Record<string, any>;
  outputPayload: Record<string, any>;
  stateSnapshot?: Record<string, any>;
  latencyMs: number;
  tokenCount?: number;
  error?: string;
  severity?: FindingSeverity;
}

export interface FuzzScenario {
  id: string;
  name: string;
  category: AttackCategory;
  promptPayload: string;
  turns?: { role: 'user' | 'assistant'; content: string }[];
  chaosConfig?: {
    simulateTimeoutMs?: number;
    injectMalformedJson?: boolean;
    rateLimitExceeded?: boolean;
    httpStatusCode?: number;
    targetTool?: string;
  };
  expectedFailureMode: string;
  riskWeight: number;
}

export interface EvaluatorResult {
  layerName: string;
  passed: boolean;
  score: number; // 0 to 1
  severity: FindingSeverity;
  violations: string[];
  details: Record<string, any>;
  confidence: number;
}

export interface ComprehensiveEvaluation {
  overallVerdict: 'PASSED' | 'FAILED';
  riskScore: number; // 0 to 100
  goalDriftScore: number;
  toolLoopSeverity: number;
  anomalyScore: number;
  layerResults: EvaluatorResult[];
  primaryRootCause?: string;
}

export interface ReactFlowNode {
  id: string;
  type: 'inputNode' | 'reasoningNode' | 'toolNode' | 'anomalyNode' | 'stateNode';
  data: {
    label: string;
    subtitle?: string;
    status?: string;
    severity?: FindingSeverity;
    payload?: any;
    rootCause?: string;
    riskScore?: number;
    latencyMs?: number;
    timestamp?: string;
  };
  position: { x: number; y: number };
}

export interface ReactFlowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
  style?: Record<string, any>;
}

export interface FailureGraphDAG {
  traceId: string;
  nodes: ReactFlowNode[];
  edges: ReactFlowEdge[];
}

export interface RemediationPatch {
  patchId: string;
  vulnerabilityTitle: string;
  severity: FindingSeverity;
  systemPromptPatch: string;
  schemaPatch: Record<string, any>;
  policyRules: string[];
  unifiedDiff: string;
  regressionTestCode: string;
  status: 'PROPOSED' | 'APPLIED' | 'VERIFIED';
}

import { ReactFlowNode, ReactFlowEdge, FailureGraphDAG, NormalizedEvent, ComprehensiveEvaluation } from '@agentshield/shared';

export class GraphService {
  public static buildDAG(traceId: string, events: NormalizedEvent[], evalReport?: ComprehensiveEvaluation): FailureGraphDAG {
    const nodes: ReactFlowNode[] = [];
    const edges: ReactFlowEdge[] = [];

    let currentX = 60;
    let prevNodeId: string | null = null;

    // Filter key events for DAG visualization
    const relevantEvents = events.filter(e => 
      ['USER_INPUT', 'MODEL_RESPONSE', 'TOOL_CALL', 'TOOL_RESPONSE', 'POLICY_VIOLATION'].includes(e.eventType)
    );

    relevantEvents.forEach((ev, idx) => {
      let nodeType: 'inputNode' | 'reasoningNode' | 'toolNode' | 'anomalyNode' | 'stateNode' = 'reasoningNode';
      let label = 'Agent Decision';
      let subtitle = '';

      if (ev.eventType === 'USER_INPUT') {
        nodeType = 'inputNode';
        label = 'User Input / Attack Payload';
        subtitle = String(ev.inputPayload?.userMessage || ev.inputPayload?.prompt || 'Adversarial Prompt Payload').substring(0, 60) + '...';
      } else if (ev.eventType === 'MODEL_RESPONSE') {
        nodeType = 'reasoningNode';
        label = 'Agent Reasoning';
        subtitle = String(ev.outputPayload?.text || ev.outputPayload?.response || 'Processing instructions').substring(0, 60) + '...';
      } else if (ev.eventType === 'TOOL_CALL') {
        nodeType = 'toolNode';
        label = `Tool Invocation: ${ev.toolName || 'tool'}`;
        subtitle = `Args: ${JSON.stringify(ev.inputPayload || {})}`;
      } else if (ev.eventType === 'TOOL_RESPONSE') {
        nodeType = 'stateNode';
        label = `Digital Twin Response`;
        subtitle = `State Mutation (${ev.latencyMs}ms)`;
      } else if (ev.eventType === 'POLICY_VIOLATION') {
        nodeType = 'anomalyNode';
        label = `🚨 Policy Violation Detected`;
        subtitle = ev.error || 'Unauthorized Action';
      }

      const nodeId = `node_${ev.eventId}`;
      nodes.push({
        id: nodeId,
        type: nodeType,
        data: {
          label,
          subtitle,
          status: ev.error ? 'FAILED' : 'SUCCESS',
          severity: ev.severity,
          payload: ev.inputPayload || ev.outputPayload,
          latencyMs: ev.latencyMs,
          timestamp: ev.timestamp
        },
        position: { x: currentX, y: 180 + (idx % 2 === 0 ? 0 : 70) }
      });

      if (prevNodeId) {
        edges.push({
          id: `edge_${prevNodeId}_${nodeId}`,
          source: prevNodeId,
          target: nodeId,
          animated: true,
          style: ev.severity === 'CRITICAL' ? { stroke: '#EF4444', strokeWidth: 3 } : { stroke: '#6366F1', strokeWidth: 2 }
        });
      }

      prevNodeId = nodeId;
      currentX += 280;
    });

    // If there is an evaluation failure, attach final anomaly node if not already present
    if (evalReport && evalReport.overallVerdict === 'FAILED' && evalReport.primaryRootCause && !nodes.some(n => n.type === 'anomalyNode')) {
      const breachNodeId = `node_breach_${traceId}`;
      nodes.push({
        id: breachNodeId,
        type: 'anomalyNode',
        data: {
          label: 'Critical Vulnerability Confirmed',
          subtitle: evalReport.primaryRootCause,
          severity: 'CRITICAL',
          rootCause: evalReport.primaryRootCause,
          riskScore: evalReport.riskScore
        },
        position: { x: currentX, y: 180 }
      });

      if (prevNodeId) {
        edges.push({
          id: `edge_${prevNodeId}_${breachNodeId}`,
          source: prevNodeId,
          target: breachNodeId,
          label: 'BREACH',
          animated: true,
          style: { stroke: '#EF4444', strokeWidth: 3 }
        });
      }
    }

    return { traceId, nodes, edges };
  }
}

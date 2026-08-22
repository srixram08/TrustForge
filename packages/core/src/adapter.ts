import { v4 as uuidv4 } from 'uuid';
import { NormalizedEvent, ExecutionEventType, ToolDefinition } from '@agentshield/shared';

export interface ExecutionSpan {
  traceId: string;
  spanId: string;
  agentId: string;
  systemPrompt?: string;
  events: NormalizedEvent[];
  startedAt: string;
  endedAt?: string;
  totalLatencyMs: number;
}

export class UniversalAgentAdapter {
  constructor(public readonly agentId: string, public readonly agentName: string) {}

  public createTrace(systemPrompt?: string): ExecutionSpan {
    const traceId = `trace_${uuidv4().substring(0, 8)}`;
    return {
      traceId,
      spanId: `span_${uuidv4().substring(0, 8)}`,
      agentId: this.agentId,
      systemPrompt,
      events: [],
      startedAt: new Date().toISOString(),
      totalLatencyMs: 0
    };
  }

  public recordEvent(
    span: ExecutionSpan,
    eventType: ExecutionEventType,
    payload: {
      input?: Record<string, any>;
      output?: Record<string, any>;
      toolName?: string;
      stateSnapshot?: Record<string, any>;
      latencyMs?: number;
      tokenCount?: number;
      error?: string;
    }
  ): NormalizedEvent {
    const event: NormalizedEvent = {
      eventId: `evt_${uuidv4().substring(0, 8)}`,
      traceId: span.traceId,
      timestamp: new Date().toISOString(),
      agentId: this.agentId,
      eventType,
      toolName: payload.toolName,
      inputPayload: payload.input || {},
      outputPayload: payload.output || {},
      stateSnapshot: payload.stateSnapshot,
      latencyMs: payload.latencyMs || 0,
      tokenCount: payload.tokenCount || 0,
      error: payload.error
    };

    span.events.push(event);
    span.totalLatencyMs += event.latencyMs;
    return event;
  }
}

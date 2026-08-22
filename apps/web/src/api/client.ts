const API_BASE = '/api';

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {})
    },
    ...options
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP ${res.status}: ${res.statusText}`);
  }

  return res.json();
}

export const api = {
  getOverview: () => fetchApi<any>('/overview'),
  getAgents: () => fetchApi<any[]>('/agents'),
  getAgentById: (id: string) => fetchApi<any>(`/agents/${id}`),
  createAgent: (data: any) => fetchApi<any>('/agents', { method: 'POST', body: JSON.stringify(data) }),
  scanAgentDNA: (id: string) => fetchApi<any>(`/agents/${id}/scan`, { method: 'POST' }),
  getDigitalTwins: () => fetchApi<any[]>('/digital-twins'),
  updateTwinFaults: (id: string, faults: any[]) => fetchApi<any>(`/digital-twins/${id}/faults`, { method: 'POST', body: JSON.stringify({ faults }) }),
  resetTwin: (id: string) => fetchApi<any>(`/digital-twins/${id}/reset`, { method: 'POST' }),
  getTestSuites: () => fetchApi<any[]>('/test-suites'),
  previewFuzz: (agentId: string, count: number = 15) => fetchApi<any[]>('/fuzz/preview', { method: 'POST', body: JSON.stringify({ agentId, count }) }),
  getExecutions: () => fetchApi<any[]>('/executions'),
  getExecutionById: (id: string) => fetchApi<any>(`/executions/${id}`),
  runExecution: (agentId: string, scenarios?: any[]) => fetchApi<any>('/executions', { method: 'POST', body: JSON.stringify({ agentId, scenarios }) }),
  getFindings: () => fetchApi<any[]>('/findings'),
  getEvaluations: () => fetchApi<any[]>('/evaluations'),
  generateRemediation: (agentId: string, findingId?: string) => fetchApi<any>('/remediation', { method: 'POST', body: JSON.stringify({ agentId, findingId }) }),
  createPullRequest: (remediationId: string) => fetchApi<any>('/github/pr', { method: 'POST', body: JSON.stringify({ remediationId }) }),
  runRegressionTest: (agentId: string, remediationId?: string) => fetchApi<any>('/regression-tests', { method: 'POST', body: JSON.stringify({ agentId, remediationId }) }),
  getIntegrations: () => fetchApi<any[]>('/integrations')
};

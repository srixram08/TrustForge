import { v4 as uuidv4 } from 'uuid';

export interface TwinState {
  accountBalances: Record<string, number>;
  customerProfiles: Record<string, any>;
  invoices: Record<string, any>;
  refundLedger: any[];
  auditLogs: string[];
  rateLimitCounters: Record<string, number>;
}

export interface FaultConfig {
  simulateTimeoutMs?: number;
  injectMalformedJson?: boolean;
  rateLimitExceeded?: boolean;
  httpStatusCode?: number;
  targetTool?: string;
}

export class StatefulDigitalTwin {
  private initialSnapshot: TwinState;
  public currentState: TwinState;
  public activeFaults: FaultConfig[] = [];
  public mutationHistory: Array<{ action: string; payload: any; timestamp: string }> = [];

  constructor(initialState?: Partial<TwinState>) {
    this.initialSnapshot = {
      accountBalances: {
        'ACC_US_1002': 2400.00,
        'ACC_US_9941': 150000.00,
        'C102': 10000.00
      },
      customerProfiles: {
        'C102': { id: 'C102', name: 'John Enterprise', tier: 'PREMIUM', status: 'ACTIVE' },
        'ACC_US_1002': { id: 'ACC_US_1002', name: 'Alice Smith', tier: 'STANDARD', status: 'ACTIVE' }
      },
      invoices: {
        'INV-9001': { id: 'INV-9001', customerId: 'C102', amount: 450.00, status: 'PAID' }
      },
      refundLedger: [],
      auditLogs: [],
      rateLimitCounters: {},
      ...initialState
    };
    this.currentState = JSON.parse(JSON.stringify(this.initialSnapshot));
  }

  public reset(): void {
    this.currentState = JSON.parse(JSON.stringify(this.initialSnapshot));
    this.mutationHistory = [];
    this.activeFaults = [];
  }

  public getStateDiff(): Record<string, any> {
    const diff: Record<string, any> = {};
    for (const [accId, bal] of Object.entries(this.currentState.accountBalances)) {
      const initial = this.initialSnapshot.accountBalances[accId] || 0;
      if (bal !== initial) {
        diff[`balance_delta_${accId}`] = {
          before: initial,
          after: bal,
          delta: bal - initial
        };
      }
    }
    if (this.currentState.refundLedger.length > this.initialSnapshot.refundLedger.length) {
      diff['new_refunds'] = this.currentState.refundLedger.slice(this.initialSnapshot.refundLedger.length);
    }
    return diff;
  }

  public async executeTool(toolName: string, args: Record<string, any>): Promise<{ result: any; success: boolean; latencyMs: number }> {
    const startTime = Date.now();
    this.currentState.rateLimitCounters[toolName] = (this.currentState.rateLimitCounters[toolName] || 0) + 1;

    // Check active faults
    const fault = this.activeFaults.find(f => !f.targetTool || f.targetTool === toolName);
    if (fault) {
      if (fault.simulateTimeoutMs) {
        await new Promise(r => setTimeout(r, Math.min(100, fault.simulateTimeoutMs!))); // bounded delay in test
        return { result: { error: `Gateway Timeout: Tool ${toolName} exceeded ${fault.simulateTimeoutMs}ms limit` }, success: false, latencyMs: fault.simulateTimeoutMs };
      }
      if (fault.rateLimitExceeded) {
        return { result: { error: `HTTP 429: Rate limit exceeded on endpoint /${toolName}` }, success: false, latencyMs: 15 };
      }
      if (fault.httpStatusCode && fault.httpStatusCode >= 500) {
        return { result: { error: `HTTP ${fault.httpStatusCode}: Internal Digital Twin Mock Server Error` }, success: false, latencyMs: 25 };
      }
      if (fault.injectMalformedJson) {
        return { result: { _raw: '{"error": "JSON parse error at byte 49 - unexpected token' }, success: false, latencyMs: 10 };
      }
    }

    if (toolName === 'get_customer' || toolName === 'get_account_details') {
      const custId = args.customerId || args.account_id || args.accountId || 'C102';
      const cust = this.currentState.customerProfiles[custId] || { id: custId, name: 'Sample User', tier: 'STANDARD' };
      const balance = this.currentState.accountBalances[custId] ?? 2500;
      return { result: { ...cust, balance }, success: true, latencyMs: Date.now() - startTime + 8 };
    }

    if (toolName === 'get_balance') {
      const accId = args.account_id || args.customerId || 'C102';
      const balance = this.currentState.accountBalances[accId] ?? 10000;
      return { result: { accountId: accId, balance, currency: 'INR' }, success: true, latencyMs: Date.now() - startTime + 5 };
    }

    if (toolName === 'search_transactions') {
      return {
        result: {
          transactions: [
            { id: 'TX-101', amount: 1500, type: 'DEBIT', date: '2026-02-18' },
            { id: 'TX-102', amount: 450, type: 'REFUND', date: '2026-02-20' }
          ]
        },
        success: true,
        latencyMs: Date.now() - startTime + 12
      };
    }

    if (toolName === 'create_invoice') {
      const invId = `INV-${uuidv4().substring(0, 6).toUpperCase()}`;
      const amount = Number(args.amount) || 100;
      this.currentState.invoices[invId] = { id: invId, customerId: args.customerId || 'C102', amount, status: 'PENDING' };
      this.mutationHistory.push({ action: 'create_invoice', payload: { invId, amount }, timestamp: new Date().toISOString() });
      return { result: { invoiceId: invId, amount, status: 'CREATED' }, success: true, latencyMs: Date.now() - startTime + 18 };
    }

    if (toolName === 'issue_refund' || toolName === 'process_refund') {
      const accId = args.customerId || args.account_id || args.accountId || 'C102';
      const amount = Number(args.amount) || 0;
      const reason = args.reason || 'Customer requested refund';

      const currentBal = this.currentState.accountBalances[accId] || 0;
      this.currentState.accountBalances[accId] = currentBal + amount;

      const record = {
        txId: `REF-${uuidv4().substring(0, 6).toUpperCase()}`,
        accountId: accId,
        amount,
        reason,
        timestamp: new Date().toISOString()
      };

      this.currentState.refundLedger.push(record);
      this.mutationHistory.push({ action: 'issue_refund', payload: record, timestamp: new Date().toISOString() });
      this.currentState.auditLogs.push(`Refund of ₹${amount} issued to ${accId}. Reason: ${reason}`);

      return {
        result: {
          status: 'REFUND_PROCESSED',
          transactionId: record.txId,
          creditedAmount: amount,
          updatedBalance: this.currentState.accountBalances[accId]
        },
        success: true,
        latencyMs: Date.now() - startTime + 22
      };
    }

    return { result: { error: `Tool ${toolName} not registered in Mock Digital Twin` }, success: false, latencyMs: 5 };
  }
}

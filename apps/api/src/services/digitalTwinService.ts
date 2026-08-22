import { prisma } from '../prisma/client.js';

export class DigitalTwinService {
  public static async getTwinsByAgentId(agentId: string) {
    return prisma.digitalTwin.findMany({
      where: { agentId },
      include: { agent: true }
    });
  }

  public static async getAllTwins() {
    return prisma.digitalTwin.findMany({
      include: { agent: true }
    });
  }

  public static async updateFaults(twinId: string, faults: any[]) {
    return prisma.digitalTwin.update({
      where: { id: twinId },
      data: {
        activeFaults: JSON.stringify(faults),
        updatedAt: new Date()
      }
    });
  }

  public static async resetState(twinId: string) {
    const twin = await prisma.digitalTwin.findUnique({ where: { id: twinId } });
    if (!twin) throw new Error('Twin not found');

    return prisma.digitalTwin.update({
      where: { id: twinId },
      data: {
        currentState: twin.initialState,
        mutationLogs: JSON.stringify([]),
        activeFaults: JSON.stringify([]),
        updatedAt: new Date()
      }
    });
  }
}

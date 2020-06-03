import Consul from 'consul';
import { HeartbeatProperties } from '../../properties';

const tasks = new Map<string, any>();

class ConsulHeartbeatTask {
  private readonly checkId: string;

  constructor(private consulClient: Consul.Consul, serviceId: string) {
    this.checkId = serviceId;
    if (!this.checkId.startsWith('service:')) {
      this.checkId = `service:${this.checkId}`;
    }
  }

  run() {
    (async () => {
      this.consulClient.agent.check.pass(this.checkId);
    })();
    console.log('Sending consul heartbeat for:', this.checkId);
  }
}

export class TtlScheduler {

  constructor(
    private heartbeatProperties: HeartbeatProperties,
    private consulClient: Consul.Consul,
  ) {
  }

  /**
   * add a service to the checks loop
   *
   * @param instanceId instance id
   */
  add(instanceId: string) {
    const task = new ConsulHeartbeatTask(this.consulClient, instanceId);
    const taskId = setInterval(() => {
      task.run();
    }, this.computeHeartbeatInterval());
    const previousTaskId = tasks.get(instanceId);
    if (previousTaskId) {
      clearInterval(previousTaskId);
    }

    tasks.set(instanceId, taskId);
  }

  remove(instanceId: string) {
    const taskId = tasks.get(instanceId);
    if (taskId) {
      clearInterval(taskId);
    }
    tasks.delete(instanceId);
  }

  private computeHeartbeatInterval(): number {
    const intervalRatio = 2.0 / 3.0;
    const interval = this.heartbeatProperties.ttlInSeconds * intervalRatio;
    const max = Math.max(interval, 1);
    const ttlMinus1 = this.heartbeatProperties.ttlInSeconds - 1;
    const min = Math.min(ttlMinus1, max);
    const heartbeatInterval = Math.round(1000 * min);
    console.log('computed heartbeat interval', heartbeatInterval);

    return heartbeatInterval;
  }
}

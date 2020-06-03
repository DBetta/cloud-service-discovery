import { ServiceRegistration } from '../../service-registration';
import { ConsulRegistration } from './consul-registration';
import Consul from 'consul';
import { TtlScheduler } from './ttl-scheduler';
import { HeartbeatProperties } from '../../properties';
import { ConsulProperties } from '../properties/consul.properties';
import { ConsulDiscoveryProperties } from '../properties/consul-discovery.properties';

/**
 *
 */
export class ConsulServiceRegistry implements ServiceRegistration<ConsulRegistration> {
  constructor(
    private consulClient: Consul.Consul,
    private consulProperties: ConsulProperties,
    private heartbeatProperties: HeartbeatProperties,
    private consulDiscoveryProperties: ConsulDiscoveryProperties,
    private ttlScheduler?: TtlScheduler,
  ) {}

  async register(registration: ConsulRegistration): Promise<void> {
    console.log('registering service with id:', registration.getInstanceId());
    try {
      const token = !!this.consulProperties.aclToken ? { token: this.consulProperties.aclToken } : {};

      const options = {
        ...registration.getService(),
        ...token,
      };

      await this.consulClient.agent.service.register(options);

      const service = registration.getService();
      if (this.heartbeatProperties.enabled && this.ttlScheduler != null && service.check?.ttl != null) {
        this.ttlScheduler.add(registration.getInstanceId());
      }
    } catch (e) {
      if (this.consulDiscoveryProperties.failFast) {
        throw e;
      }
      console.warn('Fail fast is false. Error registering service with consul:', registration.getService(), e);
    }
  }

  async deregister(registration: ConsulRegistration): Promise<void> {
    console.log('Deregistering service with consul:', registration.getInstanceId());
    this.ttlScheduler?.remove(registration.getInstanceId());

    const token = !!this.consulProperties.aclToken ? { token: this.consulProperties.aclToken } : {};
    const options = { id: registration.getInstanceId(), ...token };
    await this.consulClient.agent.service.deregister(options);
  }

  close(): void {
    // not implemented
  }

  async setStatus(registration: ConsulRegistration, status: string): Promise<void> {
    if (status == 'OUT_OF_SERVICE') {
      // enable maintenance mode
      await this.consulClient.agent.service.maintenance({
        id: registration.getInstanceId(),
        enable: true,
      });
    } else if (status == 'UP') {
    }

    throw new Error('Unknown status ' + status);
  }

  async getStatus<T>(registration: ConsulRegistration): Promise<T> {
    const checks: any[] = await this.consulClient.health.checks(registration.getServiceId());
    for (const check of checks) {
      if (check['ServiceID'] == registration.getInstanceId()) {
        if (check['Name'] == 'Service Maintenance Mode') {
          return JSON.parse(JSON.stringify({ status: 'OUT_OF_SERVICE' }));
        }
      }
    }

    return JSON.parse(JSON.stringify({ status: 'UP' }));
  }
}

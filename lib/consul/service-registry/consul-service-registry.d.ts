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
export declare class ConsulServiceRegistry implements ServiceRegistration<ConsulRegistration> {
    private consulClient;
    private consulProperties;
    private heartbeatProperties;
    private consulDiscoveryProperties;
    private ttlScheduler?;
    constructor(consulClient: Consul.Consul, consulProperties: ConsulProperties, heartbeatProperties: HeartbeatProperties, consulDiscoveryProperties: ConsulDiscoveryProperties, ttlScheduler?: TtlScheduler | undefined);
    register(registration: ConsulRegistration): Promise<void>;
    deregister(registration: ConsulRegistration): Promise<void>;
    close(): void;
    setStatus(registration: ConsulRegistration, status: string): Promise<void>;
    getStatus<T>(registration: ConsulRegistration): Promise<T>;
}

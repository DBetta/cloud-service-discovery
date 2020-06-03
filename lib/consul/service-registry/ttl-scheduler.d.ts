import Consul from 'consul';
import { HeartbeatProperties } from '../../properties';
export declare class TtlScheduler {
    private heartbeatProperties;
    private consulClient;
    constructor(heartbeatProperties: HeartbeatProperties, consulClient: Consul.Consul);
    /**
     * add a service to the checks loop
     *
     * @param instanceId instance id
     */
    add(instanceId: string): void;
    remove(instanceId: string): void;
    private computeHeartbeatInterval;
}

import Consul from "consul";
import { DiscoveryClient } from "../../discovery-client";
import { ServiceInstance } from "../../service-instance";
import { ConsulProperties } from '../properties/consul.properties';
export declare class ConsulDiscoveryClient implements DiscoveryClient {
    private consulProperties;
    readonly consulClient: Consul.Consul;
    constructor(consulProperties: ConsulProperties);
    description(): string;
    getInstances(serviceId: string): Promise<ServiceInstance[]>;
    private addInstancesToList;
    private findHost;
    private getMetadata;
    getAllInstances(): Promise<ServiceInstance[]>;
    getServices(): Promise<string[]>;
}

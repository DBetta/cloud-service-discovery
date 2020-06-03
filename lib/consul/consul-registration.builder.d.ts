import { RegistrationBuilder } from '../registration.builder';
import { HeartbeatProperties } from '../properties';
import { Registration } from '../registration';
import { ConsulDiscoveryProperties } from './properties/consul-discovery.properties';
export declare class ConsulRegistrationBuilder implements RegistrationBuilder {
    private _serviceName;
    private _port;
    private _host;
    private _instanceId;
    private _heartbeatProperties;
    private _discoveryProperties;
    constructor(host?: string, port?: number);
    discoveryProperties(properties: ConsulDiscoveryProperties): RegistrationBuilder;
    heartbeatProperties(properties: HeartbeatProperties): RegistrationBuilder;
    host(host: string): RegistrationBuilder;
    instanceId(id: string): RegistrationBuilder;
    port(port: number): RegistrationBuilder;
    serviceName(name: string): RegistrationBuilder;
    scheme(scheme: string): RegistrationBuilder;
    build(): Registration;
    private createCheck;
}

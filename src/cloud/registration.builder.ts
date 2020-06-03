import { DiscoveryProperties, HeartbeatProperties } from './properties';
import { Registration } from './registration';

export interface RegistrationBuilder {
  serviceName(name: string): RegistrationBuilder;

  instanceId(id: string): RegistrationBuilder;

  host(host: string): RegistrationBuilder;

  port(port: number): RegistrationBuilder;

  discoveryProperties(properties: DiscoveryProperties): RegistrationBuilder;

  heartbeatProperties(properties: HeartbeatProperties): RegistrationBuilder;

  build(): Registration;
}

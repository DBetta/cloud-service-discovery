import { ServiceRegistration } from './service-registration';
import { Registration } from './registration';
import { HeartbeatProperties } from './properties';
export interface ServiceRegistryBuilder {
    heartbeatProperties(properties: HeartbeatProperties): ServiceRegistryBuilder;
    build(): ServiceRegistration<Registration>;
}

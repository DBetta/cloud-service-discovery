import { ServiceRegistryBuilder } from '../../service-registry.builder';
import { ServiceRegistration } from '../../service-registration';
import { Registration } from '../../registration';
import { HeartbeatProperties } from '../../properties';
import { ConsulProperties } from '../properties/consul.properties';
import { ConsulDiscoveryProperties } from '../properties/consul-discovery.properties';
export declare class ConsulServiceRegistrationBuilder implements ServiceRegistryBuilder {
    private _consulProperties;
    private _consulDiscoveryProperties;
    private _heartbeatProperties;
    consulDiscoveryProperties(properties: ConsulDiscoveryProperties): ConsulServiceRegistrationBuilder;
    consulProperties(properties: ConsulProperties): ConsulServiceRegistrationBuilder;
    heartbeatProperties(properties: HeartbeatProperties): ConsulServiceRegistrationBuilder;
    build(): ServiceRegistration<Registration>;
}

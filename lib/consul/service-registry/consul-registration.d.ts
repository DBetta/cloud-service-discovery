import { Registration } from '../../registration';
import { NewService } from '../models';
import { ConsulDiscoveryProperties } from '../properties/consul-discovery.properties';
/**
 *
 */
export declare class ConsulRegistration implements Registration {
    private newService;
    private consulDiscoveryProperties;
    constructor(newService: NewService.Service, consulDiscoveryProperties: ConsulDiscoveryProperties);
    getService(): NewService.Service;
    getInstanceId(): string;
    getServiceId(): string;
    getHost(): string;
    getPort(): number;
    isSecure(): boolean;
    getUri(): string;
    getScheme(): string;
    getMetadata(): Map<string, string>;
}

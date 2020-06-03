import { Registration } from '../../registration';
import { NewService } from '../models';
import { ConsulUtils } from '../utils/consul-utils';
import { ConsulDiscoveryProperties } from '../properties/consul-discovery.properties';

/**
 *
 */
export class ConsulRegistration implements Registration {
  constructor(private newService: NewService.Service, private consulDiscoveryProperties: ConsulDiscoveryProperties) {}

  getService(): NewService.Service {
    return this.newService;
  }

  getInstanceId(): string {
    return this.newService.id || '';
  }

  getServiceId(): string {
    return this.newService.name;
  }

  getHost(): string {
    return this.newService.address || '';
  }

  getPort(): number {
    return this.newService.port || 0;
  }

  isSecure(): boolean {
    return this.consulDiscoveryProperties.scheme === 'https';
  }

  getUri(): string {
    const scheme = this.getScheme();

    return `${scheme}://${this.getHost()}:${this.getPort()}`;
  }

  getScheme(): string {
    return this.consulDiscoveryProperties.scheme || 'http';
  }

  getMetadata(): Map<string, string> {
    const tags = this.newService.tags || [];
    return ConsulUtils.getMetadata(tags);
  }
}

import { DiscoveryProperties } from '../../properties';

export interface ConsulDiscoveryProperties extends DiscoveryProperties {
  scheme: string;

  failFast?: boolean;
}

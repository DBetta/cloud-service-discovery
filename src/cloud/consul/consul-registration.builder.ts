import { RegistrationBuilder } from '../registration.builder';
import { HeartbeatProperties } from '../properties';
import { Registration } from '../registration';
import { ConsulRegistration } from './service-registry';
import { NewService } from './models';
import { ConsulDiscoveryProperties } from './properties/consul-discovery.properties';
import * as uuid from 'uuid';
import { IpUtils } from './utils/ip-utils';

export class ConsulRegistrationBuilder implements RegistrationBuilder {
  private _serviceName: string | undefined;
  private _port: number | undefined;
  private _host: string | undefined;
  private _instanceId: string | undefined;
  private _heartbeatProperties: HeartbeatProperties | undefined;
  private _discoveryProperties: ConsulDiscoveryProperties | undefined;

  constructor(host?: string, port?: number) {
    this._host = host;
    this._port = port;
  }

  discoveryProperties(properties: ConsulDiscoveryProperties): RegistrationBuilder {
    this._discoveryProperties = properties;
    return this;
  }

  heartbeatProperties(properties: HeartbeatProperties): RegistrationBuilder {
    this._heartbeatProperties = properties;
    return this;
  }

  host(host: string): RegistrationBuilder {
    this._host = host;
    return this;
  }

  instanceId(id: string): RegistrationBuilder {
    this._instanceId = id;
    return this;
  }

  port(port: number): RegistrationBuilder {
    this._port = port;
    return this;
  }

  serviceName(name: string): RegistrationBuilder {
    this._serviceName = name;
    return this;
  }

  scheme(scheme: string): RegistrationBuilder {
    return this;
  }

  build(): Registration {
    if (this._serviceName == null)
      throw Error('serviceName is required');

    if (this._host == null) {
      // get ip address
      this._host = IpUtils.getIpAddress();
    }

    if (this._port == null)
      throw Error('port is required');

    if (this._discoveryProperties == null)
      throw Error('ConsulDiscoveryProperties is required.');

    const scheme = this._discoveryProperties?.scheme;
    const isSecure = scheme == 'https';

    const tags = [`secure=${isSecure}`];

    if (this._instanceId == null) {
      this._instanceId = this._serviceName + '-' + uuid.v4();
    }

    const check: NewService.Check = this.createCheck();

    let newService: NewService.Service = {
      name: this._serviceName,
      port: this._port,
      address: this._host,
      id: this._instanceId,
      tags,
      check,
    };

    return new ConsulRegistration(newService, this._discoveryProperties);
  }

  private createCheck(): NewService.Check {
    let check: NewService.Check = {};

    if (this._discoveryProperties?.healthCheckCriticalTimeout != null) {
      check = {
        ...check,
        deregistercriticalserviceafter: this._discoveryProperties.healthCheckCriticalTimeout,
      };
    }

    if (this._discoveryProperties?.healthCheckUrl != null) {
      check = {
        ...check,
        http: this._discoveryProperties.healthCheckUrl,
      };
    }

    if (this._heartbeatProperties?.enabled) {
      const ttl = this._heartbeatProperties.ttlInSeconds + 's';
      return {
        ...check,
        ttl,
      };
    }

    return check;
  }

}

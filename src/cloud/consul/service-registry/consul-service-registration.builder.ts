import { ServiceRegistryBuilder } from '../../service-registry.builder';
import { ServiceRegistration } from '../../service-registration';
import { Registration } from '../../registration';
import { RegistrationBuilder } from '../../registration.builder';
import { HeartbeatProperties } from '../../properties';
import { ConsulProperties } from '../properties/consul.properties';
import { ConsulServiceRegistry } from './consul-service-registry';
import { ConsulDiscoveryProperties } from '../properties/consul-discovery.properties';
import Consul from 'consul';
import { TtlScheduler } from './ttl-scheduler';

export class ConsulServiceRegistrationBuilder implements ServiceRegistryBuilder {
  private _consulProperties: ConsulProperties | undefined;
  private _consulDiscoveryProperties: ConsulDiscoveryProperties | undefined;
  private _heartbeatProperties: HeartbeatProperties | undefined;

  // private _registrationBuilder: RegistrationBuilder | undefined;

  consulDiscoveryProperties(properties: ConsulDiscoveryProperties): ConsulServiceRegistrationBuilder {
    this._consulDiscoveryProperties = properties;
    return this;
  }

  consulProperties(properties: ConsulProperties): ConsulServiceRegistrationBuilder {
    this._consulProperties = properties;
    return this;
  }

  heartbeatProperties(properties: HeartbeatProperties): ConsulServiceRegistrationBuilder {
    this._heartbeatProperties = properties;
    return this;
  }

  /*registrationBuilder(builder: RegistrationBuilder): ServiceRegistryBuilder {
    this._registrationBuilder = builder;
    return this;
  }*/

  build(): ServiceRegistration<Registration> {

    if (this._consulProperties == null)
      throw Error('ConsulProperties is required');

    if (this._heartbeatProperties == null)
      throw Error('HeartbeatProperties is required');

    if (this._consulDiscoveryProperties == null)
      throw Error('ConsulDiscoveryProperties is required.');

    const consulClient = Consul({
      host: this._consulProperties.host,
      port: `${this._consulProperties.port}`,
      promisify: true,
      secure: this._consulProperties.secure,
    });

    let ttlScheduler;
    if (this._heartbeatProperties.enabled) {
      ttlScheduler = new TtlScheduler(
        this._heartbeatProperties,
        consulClient,
      );
    }

    return new ConsulServiceRegistry(
      consulClient,
      this._consulProperties,
      this._heartbeatProperties,
      this._consulDiscoveryProperties,
      ttlScheduler,
    );
  }

}

import { RegistrationBuilder } from './registration.builder';
import { ServiceRegistration } from './service-registration';
import { Registration } from './registration';
import { HeartbeatProperties } from './properties';

export interface ServiceRegistryBuilder {

  heartbeatProperties(properties: HeartbeatProperties): ServiceRegistryBuilder

  /*registrationBuilder(builder: RegistrationBuilder): ServiceRegistryBuilder*/

  build(): ServiceRegistration<Registration>
}

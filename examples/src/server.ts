import express from 'express';
import { ConsulRegistration } from './cloud/consul/service-registry';
import { ConsulServiceRegistrationBuilder } from './cloud/consul/service-registry/consul-service-registration.builder';
import { ConsulRegistrationBuilder } from './cloud/consul/consul-registration.builder';
import { ServiceRegistrationFactory } from './cloud/service-registration.factory';
import { IpUtils } from './cloud/consul/utils/ip-utils';
import { ConsulDiscoveryProperties } from './cloud/consul/properties/consul-discovery.properties';
import { HeartbeatProperties } from './cloud/properties';
import { ConsulProperties } from './cloud/consul/properties/consul.properties';

const app = express();

const serviceId = 'consul-example-1';
const registration = new ConsulRegistration(
  {
    name: 'consul-example',
    id: serviceId,
    address: 'localhost',
    port: 3000,
    tags: ['secure=false'],
    check: {
      ttl: '30s',
      notes: 'Consul example',
    },
  },
  { scheme: 'http' },
);

app.get('/', function(req, res) {

  res.send('Hello World!');
});
app.listen(3000, async () => {
  // await serviceRegistry.register(registration);

  const propertySearch = {
    about: {
      nature: 'New Bookings',
      status: 'Construction',
    },
    created_at: new Date(),
    description: {
      bathrooms: 1,
      bedrooms: 3,
      type: 'One Bedroom',
      tenant: {
        type: 'Family',
        dummy: {
          dummy: 0,
        },
      },
      myArray: ['test'],
    },
    external: ['Security Guards', 'Test'],
    internal: ['Gym'],
    str: '9',
    num: 9,
  };
  /*const processor = new ProcessSearch({});
  const output = processor.process(propertySearch);
  console.log(output);*/

  const consulDiscoveryProperties: ConsulDiscoveryProperties = {
    scheme: 'http',
    failFast: false,
    healthCheckCriticalTimeout: '10s',
  };
  const heartbeatProperties: HeartbeatProperties = {
    enabled: true,
    ttlInSeconds: 30,
  };
  const consulProperties: ConsulProperties = {
    port: 8500,
    host: 'localhost',
  };

  const registration = new ConsulRegistrationBuilder()
    .discoveryProperties(consulDiscoveryProperties)
    .heartbeatProperties(heartbeatProperties)
    // .host('localhost')
    .port(3000)
    .serviceName('consul-example')
    // .instanceId('consul-example-0')
    .build();

  const serviceRegistration = new ConsulServiceRegistrationBuilder()
    .consulProperties(consulProperties)
    .heartbeatProperties(heartbeatProperties)
    .consulDiscoveryProperties(consulDiscoveryProperties)
    .build();

  console.log('App is listening on port 3000!');
});


/* process.on("exit", async () => {
  console.log("exit");
  await serviceRegistry.deregister(registration);
  process.exit(0);
});

process.on("SIGUSR2", async () => {
  console.log("SIGUSR2");
  await serviceRegistry.deregister(registration);
  process.exit(0);
}); */

import { ServiceInstance } from './service-instance';
export declare class DefaultServiceInstance implements ServiceInstance {
    private instanceId;
    private serviceId;
    private host;
    private port;
    private secure;
    private metadata?;
    /**
     * @param instanceId the id of the instance.
     * @param serviceId the id of the service.
     * @param host the host where the service instance can be found.
     * @param port the port on which the service is running.
     * @param secure indicates whether or not the connection needs to be secure.
     * @param metadata optional a map containing metadata.
     */
    constructor(instanceId: string, serviceId: string, host: string, port: number, secure: boolean, metadata?: Map<string, string> | undefined);
    getInstanceId(): string;
    getServiceId(): string;
    getHost(): string;
    getPort(): number;
    isSecure(): boolean;
    getUri(): string;
    getScheme(): string;
    getMetadata(): Map<string, string>;
}

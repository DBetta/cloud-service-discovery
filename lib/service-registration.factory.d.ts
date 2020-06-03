import { Registration } from './registration';
import { ServiceRegistration } from './service-registration';
export declare class ServiceRegistrationFactory {
    private registration;
    private serviceRegistration;
    private static INSTANCE;
    private isRunning;
    private constructor();
    register(): Promise<void>;
    deregister(): Promise<void>;
    /**
     *
     * @param registration
     * @param serviceRegistration
     * @returns ServiceRegistrationFactory
     */
    static getInstance(registration: Registration, serviceRegistration: ServiceRegistration<Registration>): ServiceRegistrationFactory;
}

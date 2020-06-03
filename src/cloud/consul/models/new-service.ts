export namespace NewService {
  export interface Check {
    http?: string;
    script?: string;
    interval?: string;
    ttl?: string;
    notes?: string;
    status?: string;
    deregistercriticalserviceafter?: string;
  }

  export interface Service {
    name: string;
    id?: string;
    tags?: string[];
    address?: string;
    port?: number;
    check?: Check;
  }
}

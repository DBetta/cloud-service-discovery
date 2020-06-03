export interface ConsulProperties {
    host: string;
    port: number;
    secure?: boolean;
    aclToken?: string;
    passing?: boolean;
}

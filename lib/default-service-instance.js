"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultServiceInstance = void 0;
var DefaultServiceInstance = /** @class */ (function () {
    /**
     * @param instanceId the id of the instance.
     * @param serviceId the id of the service.
     * @param host the host where the service instance can be found.
     * @param port the port on which the service is running.
     * @param secure indicates whether or not the connection needs to be secure.
     * @param metadata optional a map containing metadata.
     */
    function DefaultServiceInstance(instanceId, serviceId, host, port, secure, metadata) {
        this.instanceId = instanceId;
        this.serviceId = serviceId;
        this.host = host;
        this.port = port;
        this.secure = secure;
        this.metadata = metadata;
    }
    DefaultServiceInstance.prototype.getInstanceId = function () {
        return this.instanceId;
    };
    DefaultServiceInstance.prototype.getServiceId = function () {
        return this.serviceId;
    };
    DefaultServiceInstance.prototype.getHost = function () {
        return this.host;
    };
    DefaultServiceInstance.prototype.getPort = function () {
        return this.port;
    };
    DefaultServiceInstance.prototype.isSecure = function () {
        return this.secure;
    };
    DefaultServiceInstance.prototype.getUri = function () {
        var scheme = this.getScheme();
        return scheme + "://" + this.getHost() + ":" + this.getPort();
    };
    DefaultServiceInstance.prototype.getScheme = function () {
        return this.isSecure() ? 'https' : 'http';
    };
    DefaultServiceInstance.prototype.getMetadata = function () {
        return this.metadata || new Map();
    };
    return DefaultServiceInstance;
}());
exports.DefaultServiceInstance = DefaultServiceInstance;

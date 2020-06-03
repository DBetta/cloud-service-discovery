"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsulRegistration = void 0;
var consul_utils_1 = require("../utils/consul-utils");
/**
 *
 */
var ConsulRegistration = /** @class */ (function () {
    function ConsulRegistration(newService, consulDiscoveryProperties) {
        this.newService = newService;
        this.consulDiscoveryProperties = consulDiscoveryProperties;
    }
    ConsulRegistration.prototype.getService = function () {
        return this.newService;
    };
    ConsulRegistration.prototype.getInstanceId = function () {
        return this.newService.id || "";
    };
    ConsulRegistration.prototype.getServiceId = function () {
        return this.newService.name;
    };
    ConsulRegistration.prototype.getHost = function () {
        return this.newService.address || "";
    };
    ConsulRegistration.prototype.getPort = function () {
        return this.newService.port || 0;
    };
    ConsulRegistration.prototype.isSecure = function () {
        return this.consulDiscoveryProperties.scheme === "https";
    };
    ConsulRegistration.prototype.getUri = function () {
        var scheme = this.getScheme();
        return scheme + "://" + this.getHost() + ":" + this.getPort();
    };
    ConsulRegistration.prototype.getScheme = function () {
        return this.consulDiscoveryProperties.scheme || "http";
    };
    ConsulRegistration.prototype.getMetadata = function () {
        var tags = this.newService.tags || [];
        return consul_utils_1.ConsulUtils.getMetadata(tags);
    };
    return ConsulRegistration;
}());
exports.ConsulRegistration = ConsulRegistration;

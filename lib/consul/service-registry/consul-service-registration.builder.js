"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsulServiceRegistrationBuilder = void 0;
var consul_service_registry_1 = require("./consul-service-registry");
var consul_1 = __importDefault(require("consul"));
var ttl_scheduler_1 = require("./ttl-scheduler");
var ConsulServiceRegistrationBuilder = /** @class */ (function () {
    function ConsulServiceRegistrationBuilder() {
    }
    // private _registrationBuilder: RegistrationBuilder | undefined;
    ConsulServiceRegistrationBuilder.prototype.consulDiscoveryProperties = function (properties) {
        this._consulDiscoveryProperties = properties;
        return this;
    };
    ConsulServiceRegistrationBuilder.prototype.consulProperties = function (properties) {
        this._consulProperties = properties;
        return this;
    };
    ConsulServiceRegistrationBuilder.prototype.heartbeatProperties = function (properties) {
        this._heartbeatProperties = properties;
        return this;
    };
    /*registrationBuilder(builder: RegistrationBuilder): ServiceRegistryBuilder {
      this._registrationBuilder = builder;
      return this;
    }*/
    ConsulServiceRegistrationBuilder.prototype.build = function () {
        if (this._consulProperties == null)
            throw Error('ConsulProperties is required');
        if (this._heartbeatProperties == null)
            throw Error('HeartbeatProperties is required');
        if (this._consulDiscoveryProperties == null)
            throw Error('ConsulDiscoveryProperties is required.');
        var consulClient = consul_1.default({
            host: this._consulProperties.host,
            port: "" + this._consulProperties.port,
            promisify: true,
            secure: this._consulProperties.secure,
        });
        var ttlScheduler;
        if (this._heartbeatProperties.enabled) {
            ttlScheduler = new ttl_scheduler_1.TtlScheduler(this._heartbeatProperties, consulClient);
        }
        return new consul_service_registry_1.ConsulServiceRegistry(consulClient, this._consulProperties, this._heartbeatProperties, this._consulDiscoveryProperties, ttlScheduler);
    };
    return ConsulServiceRegistrationBuilder;
}());
exports.ConsulServiceRegistrationBuilder = ConsulServiceRegistrationBuilder;

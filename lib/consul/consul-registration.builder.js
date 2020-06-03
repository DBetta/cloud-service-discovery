"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsulRegistrationBuilder = void 0;
var service_registry_1 = require("./service-registry");
var uuid = __importStar(require("uuid"));
var ip_utils_1 = require("./utils/ip-utils");
var ConsulRegistrationBuilder = /** @class */ (function () {
    function ConsulRegistrationBuilder(host, port) {
        this._host = host;
        this._port = port;
    }
    ConsulRegistrationBuilder.prototype.discoveryProperties = function (properties) {
        this._discoveryProperties = properties;
        return this;
    };
    ConsulRegistrationBuilder.prototype.heartbeatProperties = function (properties) {
        this._heartbeatProperties = properties;
        return this;
    };
    ConsulRegistrationBuilder.prototype.host = function (host) {
        this._host = host;
        return this;
    };
    ConsulRegistrationBuilder.prototype.instanceId = function (id) {
        this._instanceId = id;
        return this;
    };
    ConsulRegistrationBuilder.prototype.port = function (port) {
        this._port = port;
        return this;
    };
    ConsulRegistrationBuilder.prototype.serviceName = function (name) {
        this._serviceName = name;
        return this;
    };
    ConsulRegistrationBuilder.prototype.scheme = function (scheme) {
        return this;
    };
    ConsulRegistrationBuilder.prototype.build = function () {
        var _a;
        if (this._serviceName == null)
            throw Error('serviceName is required');
        if (this._host == null) {
            // get ip address
            this._host = ip_utils_1.IpUtils.getIpAddress();
        }
        if (this._port == null)
            throw Error('port is required');
        if (this._discoveryProperties == null)
            throw Error('ConsulDiscoveryProperties is required.');
        var scheme = (_a = this._discoveryProperties) === null || _a === void 0 ? void 0 : _a.scheme;
        var isSecure = scheme == 'https';
        var tags = ["secure=" + isSecure];
        if (this._instanceId == null) {
            this._instanceId = this._serviceName + '-' + uuid.v4();
        }
        var check = this.createCheck();
        var newService = {
            name: this._serviceName,
            port: this._port,
            address: this._host,
            id: this._instanceId,
            tags: tags,
            check: check,
        };
        return new service_registry_1.ConsulRegistration(newService, this._discoveryProperties);
    };
    ConsulRegistrationBuilder.prototype.createCheck = function () {
        var _a, _b, _c;
        var check = {};
        if (((_a = this._discoveryProperties) === null || _a === void 0 ? void 0 : _a.healthCheckCriticalTimeout) != null) {
            check = __assign(__assign({}, check), { deregistercriticalserviceafter: this._discoveryProperties.healthCheckCriticalTimeout });
        }
        if (((_b = this._discoveryProperties) === null || _b === void 0 ? void 0 : _b.healthCheckUrl) != null) {
            check = __assign(__assign({}, check), { http: this._discoveryProperties.healthCheckUrl });
        }
        if ((_c = this._heartbeatProperties) === null || _c === void 0 ? void 0 : _c.enabled) {
            var ttl = this._heartbeatProperties.ttlInSeconds + 's';
            return __assign(__assign({}, check), { ttl: ttl });
        }
        return check;
    };
    return ConsulRegistrationBuilder;
}());
exports.ConsulRegistrationBuilder = ConsulRegistrationBuilder;

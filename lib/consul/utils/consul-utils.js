"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsulUtils = void 0;
var ConsulUtils = /** @class */ (function () {
    function ConsulUtils() {
    }
    ConsulUtils.getMetadata = function (tags) {
        var metadata = new Map();
        for (var _i = 0, tags_1 = tags; _i < tags_1.length; _i++) {
            var tag = tags_1[_i];
            var parts = tag.split("=");
            metadata.set(parts[0], parts[1]);
        }
        return metadata;
    };
    return ConsulUtils;
}());
exports.ConsulUtils = ConsulUtils;

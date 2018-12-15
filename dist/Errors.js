"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InvalidLayerError = (function () {
    function InvalidLayerError() {
    }
    Object.defineProperty(InvalidLayerError.prototype, "name", {
        get: function () {
            return "InvalidLayerError";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InvalidLayerError.prototype, "message", {
        get: function () {
            return "Layer ID does note exist (check the enum).";
        },
        enumerable: true,
        configurable: true
    });
    return InvalidLayerError;
}());
exports.InvalidLayerError = InvalidLayerError;

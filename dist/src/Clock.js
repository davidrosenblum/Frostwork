"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Clock = (function () {
    function Clock() {
        this._then = 0;
    }
    Clock.prototype.getDelta = function () {
        var now = Date.now();
        var delta = (now - this.then);
        this._then = now;
        return delta;
    };
    Object.defineProperty(Clock.prototype, "then", {
        get: function () {
            return this._then;
        },
        enumerable: true,
        configurable: true
    });
    return Clock;
}());
exports.Clock = Clock;

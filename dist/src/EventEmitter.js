"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter = (function () {
    function EventEmitter() {
        this._eventListeners = {};
    }
    EventEmitter.prototype.emit = function (eventType) {
        var event = typeof eventType === "string" ? {
            type: eventType,
            emitter: this
        } : eventType;
        event.emitter = this;
        if (this.willTrigger(event.type)) {
            this._eventListeners[event.type].forEach(function (listener) { return listener(event); });
            return true;
        }
        return false;
    };
    EventEmitter.prototype.on = function (eventType, listener) {
        if (this.willTrigger(eventType)) {
            this._eventListeners[eventType].push(listener);
        }
        else {
            this._eventListeners[eventType] = [listener];
        }
    };
    EventEmitter.prototype.off = function (eventType, listener) {
        if (this.willTrigger(eventType)) {
            var listeners = this._eventListeners[eventType];
            for (var i = 0; i < listeners.length; i++) {
                if (listeners[i] === listener) {
                    listeners.splice(i, 1);
                    return true;
                }
            }
        }
        return false;
    };
    EventEmitter.prototype.removeListeners = function (eventType) {
        return delete this._eventListeners[eventType];
    };
    EventEmitter.prototype.removeAllListeners = function () {
        this._eventListeners = {};
    };
    EventEmitter.prototype.willTrigger = function (eventType) {
        return eventType in this._eventListeners;
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;

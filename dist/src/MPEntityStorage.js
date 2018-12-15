"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MPEntityStorage = (function () {
    function MPEntityStorage() {
        this._objects = {};
    }
    MPEntityStorage.prototype.addObject = function (object) {
        if (this.containsObject(object)) {
            this._objects[object.objectID] = object;
            return true;
        }
        return false;
    };
    MPEntityStorage.prototype.removeObject = function (object) {
        return delete this._objects[object.objectID];
    };
    MPEntityStorage.prototype.updateObject = function (data) {
        var object = this.getObject(data.objectID);
        if (object) {
            object.applyUpdate(data);
            return true;
        }
        return false;
    };
    MPEntityStorage.prototype.clear = function () {
        this._objects = {};
    };
    MPEntityStorage.prototype.containsObject = function (object) {
        if (typeof object === "string") {
            return object in this._objects;
        }
        return object.objectID in this._objects;
    };
    MPEntityStorage.prototype.getObject = function (objectID) {
        return this._objects[objectID] || null;
        ;
    };
    return MPEntityStorage;
}());
exports.MPEntityStorage = MPEntityStorage;

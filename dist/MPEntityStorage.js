"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MPEntityStorage = (function () {
    function MPEntityStorage() {
        this._objects = {};
        this._numObjects = 0;
    }
    MPEntityStorage.prototype.addObject = function (object) {
        if (!this.containsObject(object)) {
            this._objects[object.objectID] = object;
            this._numObjects++;
            return true;
        }
        return false;
    };
    MPEntityStorage.prototype.removeObject = function (object) {
        return this.removeObjectById(object.objectID);
    };
    MPEntityStorage.prototype.removeObjectById = function (id) {
        if (delete this._objects[id]) {
            this._numObjects--;
            return true;
        }
        return false;
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
    Object.defineProperty(MPEntityStorage.prototype, "numObjects", {
        get: function () {
            return this._numObjects;
        },
        enumerable: true,
        configurable: true
    });
    return MPEntityStorage;
}());
exports.MPEntityStorage = MPEntityStorage;

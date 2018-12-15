"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MultiplayerStorage = (function () {
    function MultiplayerStorage() {
        this._objects = {};
    }
    MultiplayerStorage.prototype.addObject = function (object) {
        if (this.containsObject(object)) {
            this._objects[object.objectID] = object;
            return true;
        }
        return false;
    };
    MultiplayerStorage.prototype.removeObject = function (object) {
        return delete this._objects[object.objectID];
    };
    MultiplayerStorage.prototype.updateObject = function (data) {
        var object = this.getObject(data.objectID);
        if (object) {
            object.applyUpdate(data);
            return true;
        }
        return false;
    };
    MultiplayerStorage.prototype.clear = function () {
        this._objects = {};
    };
    MultiplayerStorage.prototype.containsObject = function (object) {
        if (typeof object === "string") {
            return object in this._objects;
        }
        return object.objectID in this._objects;
    };
    MultiplayerStorage.prototype.getObject = function (objectID) {
        return this._objects[objectID] || null;
        ;
    };
    return MultiplayerStorage;
}());
exports.MultiplayerStorage = MultiplayerStorage;

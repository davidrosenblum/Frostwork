"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var FrostworkGame_1 = require("./FrostworkGame");
var Enums_1 = require("./Enums");
var MPGameEntity_1 = require("./MPGameEntity");
var FrostworkMPGame = (function (_super) {
    __extends(FrostworkMPGame, _super);
    function FrostworkMPGame(width, height) {
        var _this = _super.call(this, width, height) || this;
        _this._multiplayerObjects = new GameObjectsHelper();
        return _this;
    }
    FrostworkMPGame.prototype.stop = function () {
        this._multiplayerObjects.clear();
        _super.prototype.stop.call(this);
    };
    FrostworkMPGame.prototype.add = function (object, layer) {
        if (layer === void 0) { layer = Enums_1.GameLayer.MIDGROUND; }
        if (object instanceof MPGameEntity_1.MPGameEntity) {
            if (!this._multiplayerObjects.addObject(object)) {
                throw new Error("MP_ENTITY_ADD_ERROR: Multiplayer object already in the game.");
            }
        }
        return _super.prototype.add.call(this, object, layer);
    };
    FrostworkMPGame.prototype.remove = function (target, layer) {
        if (layer === void 0) { layer = Enums_1.GameLayer.MIDGROUND; }
        if (target instanceof MPGameEntity_1.MPGameEntity) {
            if (this._multiplayerObjects.removeObject(target)) {
                return _super.prototype.remove.call(this, target, layer);
            }
            return false;
        }
    };
    FrostworkMPGame.prototype.updateObject = function (data) {
        return this._multiplayerObjects.updateObject(data);
    };
    return FrostworkMPGame;
}(FrostworkGame_1.FrostworkGame));
exports.FrostworkMPGame = FrostworkMPGame;
var GameObjectsHelper = (function () {
    function GameObjectsHelper() {
        this.objects = null;
    }
    GameObjectsHelper.prototype.addObject = function (object) {
        if (this.containsObject(object)) {
            this.objects[object.objectID] = object;
            return true;
        }
        return false;
    };
    GameObjectsHelper.prototype.removeObject = function (object) {
        return delete this.objects[object.objectID];
    };
    GameObjectsHelper.prototype.updateObject = function (data) {
        var object = this.getObject(data.objectID);
        if (object) {
            object.applyUpdate(data);
            return true;
        }
        return false;
    };
    GameObjectsHelper.prototype.clear = function () {
        this.objects = {};
    };
    GameObjectsHelper.prototype.containsObject = function (object) {
        if (typeof object === "string") {
            return object in this.objects;
        }
        return object.objectID in this.objects;
    };
    GameObjectsHelper.prototype.getObject = function (objectID) {
        return this.objects[objectID] || null;
        ;
    };
    return GameObjectsHelper;
}());

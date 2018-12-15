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
var GameEntity_1 = require("./GameEntity");
var MPGameEntity = (function (_super) {
    __extends(MPGameEntity, _super);
    function MPGameEntity(image, width, height, x, y, objectID, teamID) {
        if (objectID === void 0) { objectID = null; }
        if (teamID === void 0) { teamID = null; }
        var _this = _super.call(this, image, width, height, x, y) || this;
        _this._objectID = objectID;
        _this._teamID = teamID;
        return _this;
    }
    MPGameEntity.prototype.applyUpdate = function (update) {
        if (update.x) {
            this.x = update.x;
        }
        if (update.y) {
            this.y = update.y;
        }
        if (update.facing) {
            this.facing = update.facing;
        }
        if (update.anim) {
            this.playAnimation(update.anim);
        }
        if (update.moveSpeed) {
            this.moveSpeed = update.moveSpeed;
        }
    };
    MPGameEntity.prototype.getData = function () {
        return {
            x: this.x,
            y: this.y,
            anim: this.currentAnimation,
            facing: this.facing,
            moveSpeed: this.moveSpeed,
            objectID: this.objectID,
            teamID: this.teamID
        };
    };
    Object.defineProperty(MPGameEntity.prototype, "objectID", {
        get: function () {
            return this._objectID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MPGameEntity.prototype, "teamID", {
        get: function () {
            return this._teamID;
        },
        enumerable: true,
        configurable: true
    });
    return MPGameEntity;
}(GameEntity_1.GameEntity));
exports.MPGameEntity = MPGameEntity;

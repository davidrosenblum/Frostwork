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
var BoundingBox_1 = require("./BoundingBox");
var DisplayObject_1 = require("./DisplayObject");
var Scene_1 = require("./Scene");
var Object2D = (function (_super) {
    __extends(Object2D, _super);
    function Object2D(width, height, x, y) {
        var _this = _super.call(this, width, height, x, y) || this;
        _this._parent = null;
        _this._collisionBounds = null;
        _this._scene = new Scene_1.Scene(_this);
        return _this;
    }
    Object2D.prototype.drawChildren = function (ctx, x, y) {
        this._scene.draw(ctx, x, y);
    };
    Object2D.prototype.remove = function () {
        if (this._parent) {
            this._parent.scene.removeChild(this);
        }
    };
    Object2D.prototype.collisionTest = function (target) {
        var bounds1 = this.getCollisionBox();
        var bounds2 = target.getCollisionBox();
        return bounds1.hitBoxTest(bounds2);
    };
    Object2D.prototype.collisionTests = function (targets) {
        for (var _i = 0, targets_1 = targets; _i < targets_1.length; _i++) {
            var target = targets_1[_i];
            if (this.collisionTest(target)) {
                return target;
            }
        }
        return null;
    };
    Object2D.prototype.useDefaultCollisionBounds = function () {
        this._collisionBounds = null;
    };
    Object2D.prototype.setCustomCollisionBounds = function (width, height) {
        this._collisionBounds = { width: width, height: height };
    };
    Object2D.prototype.setParent = function (parent) {
        if (parent.scene.containsChild(this)) {
            this._parent = parent;
        }
    };
    Object2D.prototype.getBoundingBox = function () {
        return new BoundingBox_1.BoundingBox(this.x, this.y, this.width, this.height);
    };
    Object2D.prototype.getCollisionBox = function () {
        if (this._collisionBounds) {
            var x = this.x - (this._collisionBounds.width - this.width) / 2;
            var y = this.bottom - this._collisionBounds.height;
            return new BoundingBox_1.BoundingBox(x, y, this._collisionBounds.width, this._collisionBounds.height);
        }
        return this.getBoundingBox();
    };
    Object2D.prototype.getCoords = function (tileSize, offsetX, offsetY) {
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        var cb = this.getCollisionBox();
        return {
            x: Math.floor((cb.centerX + offsetX) / tileSize),
            y: Math.floor((cb.centerY + offsetY) / tileSize)
        };
    };
    Object.defineProperty(Object2D.prototype, "collisionBounds", {
        get: function () {
            return this._collisionBounds || this.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Object2D.prototype, "scene", {
        get: function () {
            return this._scene;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Object2D.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        enumerable: true,
        configurable: true
    });
    return Object2D;
}(DisplayObject_1.DisplayObject));
exports.Object2D = Object2D;

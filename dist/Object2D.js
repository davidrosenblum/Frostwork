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
var EventEmitter_1 = require("./EventEmitter");
var Scene_1 = require("./Scene");
var TokenGenerator_1 = require("./TokenGenerator");
var Object2D = (function (_super) {
    __extends(Object2D, _super);
    function Object2D(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var _this = _super.call(this) || this;
        _this._id = Object2D.tokens.nextToken();
        _this._position = { x: x, y: y };
        _this._scene = new Scene_1.Scene();
        _this.visible = true;
        return _this;
    }
    Object2D.prototype.drawChildren = function (ctx, offsetX, offsetY) {
        this._scene.draw(ctx, offsetX, offsetY);
    };
    Object2D.prototype.setPosition = function (x, y) {
        this._position.x = x;
        this._position.y = y;
        this.emit("move");
    };
    Object.defineProperty(Object2D.prototype, "x", {
        get: function () {
            return this._position.x;
        },
        set: function (x) {
            this._position.x = x;
            this.emit("move");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Object2D.prototype, "y", {
        get: function () {
            return this._position.y;
        },
        set: function (y) {
            this._position.y = y;
            this.emit("move");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Object2D.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object2D.tokens = new TokenGenerator_1.TokenGenerator(16);
    return Object2D;
}(EventEmitter_1.EventEmitter));
exports.Object2D = Object2D;

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
    function Object2D(width, height, x, y) {
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var _this = _super.call(this) || this;
        _this._id = Object2D.tokens.nextToken();
        _this._position = { x: x, y: y };
        _this._size = { width: width, height: height, depth: height - width };
        _this._scene = new Scene_1.Scene();
        _this._parent = null;
        _this._alpha = 1;
        _this.visible = true;
        return _this;
    }
    Object2D.prototype.drawChildren = function (ctx, offsetX, offsetY) {
        this._scene.draw(ctx, this.x + offsetX, this.y + offsetY);
    };
    Object2D.prototype.setParent = function (parent) {
        this._parent = parent;
    };
    Object2D.prototype.setPosition = function (x, y) {
        this._position.x = x;
        this._position.y = y;
        this.emit("move");
    };
    Object2D.prototype.setSize = function (width, height, depth) {
        this._size = { width: width, height: height, depth: depth || height - width };
    };
    Object2D.prototype.remove = function () {
        if (this._parent) {
            this._parent.scene.removeChild(this);
        }
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
    Object.defineProperty(Object2D.prototype, "width", {
        get: function () {
            return this._size.width;
        },
        set: function (width) {
            this._size.width = width;
            this.emit("resize");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Object2D.prototype, "height", {
        get: function () {
            return this._size.height;
        },
        set: function (height) {
            this._size.height = height;
            this.emit("resize");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Object2D.prototype, "depth", {
        get: function () {
            return this._size.depth;
        },
        set: function (depth) {
            this._size.depth = depth;
            this.emit("resize");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Object2D.prototype, "alpha", {
        get: function () {
            return this._alpha;
        },
        set: function (alpha) {
            this._alpha = Math.min(Math.max(alpha, 0), 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Object2D.prototype, "position", {
        get: function () {
            return this._position;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Object2D.prototype, "size", {
        get: function () {
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Object2D.prototype, "centerX", {
        get: function () {
            return this.x + this.width / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Object2D.prototype, "centerY", {
        get: function () {
            return this.y + this.height / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Object2D.prototype, "right", {
        get: function () {
            return this.x + this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Object2D.prototype, "front", {
        get: function () {
            return this.bottom - this.depth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Object2D.prototype, "bottom", {
        get: function () {
            return this.y + this.height;
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
    Object.defineProperty(Object2D.prototype, "id", {
        get: function () {
            return this._id;
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
    Object2D.tokens = new TokenGenerator_1.TokenGenerator(16);
    return Object2D;
}(EventEmitter_1.EventEmitter));
exports.Object2D = Object2D;

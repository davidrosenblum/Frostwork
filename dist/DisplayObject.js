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
var TokenGenerator_1 = require("./TokenGenerator");
var DisplayObject = (function (_super) {
    __extends(DisplayObject, _super);
    function DisplayObject(width, height, x, y) {
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var _this = _super.call(this) || this;
        _this._id = DisplayObject.tokens.nextToken();
        _this._position = { x: x, y: y };
        _this._size = { width: width, height: height };
        _this._alpha = 1;
        _this.visible = true;
        return _this;
    }
    DisplayObject.prototype.setPosition = function (x, y) {
        this._position.x = x;
        this._position.y = y;
        this.emit("move");
    };
    DisplayObject.prototype.setSize = function (width, height) {
        this._size = { width: width, height: height };
        this.emit("resize");
    };
    Object.defineProperty(DisplayObject.prototype, "x", {
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
    Object.defineProperty(DisplayObject.prototype, "y", {
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
    Object.defineProperty(DisplayObject.prototype, "width", {
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
    Object.defineProperty(DisplayObject.prototype, "height", {
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
    Object.defineProperty(DisplayObject.prototype, "alpha", {
        get: function () {
            return this._alpha;
        },
        set: function (alpha) {
            this._alpha = Math.min(Math.max(alpha, 0), 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "position", {
        get: function () {
            return this._position;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "size", {
        get: function () {
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "bottom", {
        get: function () {
            return this.y + this.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "centerX", {
        get: function () {
            return this.x + this.width / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "centerY", {
        get: function () {
            return this.y + this.height / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "right", {
        get: function () {
            return this.x + this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    DisplayObject.tokens = new TokenGenerator_1.TokenGenerator(16);
    return DisplayObject;
}(EventEmitter_1.EventEmitter));
exports.DisplayObject = DisplayObject;

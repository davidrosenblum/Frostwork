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
var Object2D_1 = require("./Object2D");
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField(text, x, y, font, fillStyle, strokeStyle) {
        if (text === void 0) { text = null; }
        var _this = _super.call(this, x, y) || this;
        _this.text = text;
        _this.font = font;
        _this.strokeStyle = strokeStyle;
        _this.fillStyle = fillStyle;
        _this.maxWidth = undefined;
        return _this;
    }
    TextField.prototype.draw = function (ctx, offsetX, offsetY) {
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        if (this.visible) {
            this.emit("draw");
            var x = this.x + offsetX;
            var y = this.y + offsetY;
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.font = this.font;
            ctx.fillStyle = this.fillStyle;
            ctx.strokeStyle = this.strokeStyle;
            ctx.fillText(this.text, x, y, this.maxWidth);
            ctx.strokeText(this.text, x, y, this.maxWidth);
            ctx.restore();
        }
    };
    Object.defineProperty(TextField.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (text) {
            this._text = text || "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "font", {
        get: function () {
            return this._font;
        },
        set: function (font) {
            this._font = font || TextField.defaultFont;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "strokeStyle", {
        get: function () {
            return this._strokeStyle;
        },
        set: function (strokeColor) {
            this._strokeStyle = strokeColor || TextField.defaultStrokeColor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "fillStyle", {
        get: function () {
            return this._fillStyle;
        },
        set: function (fillColor) {
            this._fillStyle = fillColor || TextField.defaultFillColor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "maxWidth", {
        get: function () {
            return this._maxWidth;
        },
        set: function (maxWidth) {
            this._maxWidth = maxWidth || undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "width", {
        get: function () {
            TextField.CTX.font = this.font;
            return TextField.CTX.measureText(this.text).width;
        },
        set: function (width) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "height", {
        get: function () {
            return parseFloat(this.font) || 0;
        },
        set: function (height) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "right", {
        get: function () {
            return this.x + this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "bottom", {
        get: function () {
            return this.y + this.height;
        },
        enumerable: true,
        configurable: true
    });
    TextField.CANVAS = document.createElement("canvas");
    TextField.CTX = TextField.CANVAS.getContext("2d");
    TextField.defaultFont = "15px calibri";
    TextField.defaultStrokeColor = "black";
    TextField.defaultFillColor = "white";
    return TextField;
}(Object2D_1.Object2D));
exports.TextField = TextField;

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
    function TextField(text, x, y, font, fillColor, strokeColor) {
        if (text === void 0) { text = null; }
        var _this = _super.call(this, x, y) || this;
        _this.text = text;
        _this.font = font;
        _this.strokeColor = strokeColor;
        _this.fillColor = fillColor;
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
            ctx.fillText(this.text, x, y, this.maxWidth);
            ctx.strokeText(this.text, x, y, this.maxWidth);
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
            this._fillColor = font || TextField.defaultFont;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "strokeColor", {
        get: function () {
            return this._strokeColor;
        },
        set: function (strokeColor) {
            this._strokeColor = strokeColor || TextField.defaultStrokeColor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "fillColor", {
        get: function () {
            return this._fillColor;
        },
        set: function (fillColor) {
            this._fillColor = fillColor || TextField.defaultFillColor;
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
    TextField.defaultFont = "15px calibri";
    TextField.defaultStrokeColor = "black";
    TextField.defaultFillColor = "white";
    return TextField;
}(Object2D_1.Object2D));
exports.TextField = TextField;
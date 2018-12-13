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
var Renderer = (function (_super) {
    __extends(Renderer, _super);
    function Renderer(width, height) {
        if (width === void 0) { width = 550; }
        if (height === void 0) { height = 400; }
        var _this = _super.call(this) || this;
        _this._canvas = document.createElement("canvas");
        _this._context = _this._canvas.getContext("2d");
        _this._rendering = false;
        _this.resize(width, height);
        return _this;
    }
    Renderer.prototype.clear = function () {
        this._context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    };
    Renderer.prototype.renderFrame = function (scene) {
        this.emit("render");
        this.clear();
        scene.draw(this._context, 0, 0);
        if (this.isRendering) {
            requestAnimationFrame(this.renderFrame.bind(this));
        }
    };
    Renderer.prototype.startRendering = function (scene) {
        this._rendering = true;
        this.renderFrame(scene);
    };
    Renderer.prototype.stopRendering = function () {
        this._rendering = false;
    };
    Renderer.prototype.resize = function (width, height) {
        this._canvas.width = width;
        this._canvas.height = height;
    };
    Object.defineProperty(Renderer.prototype, "canvasWidth", {
        get: function () {
            return this._canvas.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Renderer.prototype, "canvasHeight", {
        get: function () {
            return this._canvas.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Renderer.prototype, "canvas", {
        get: function () {
            return this._canvas;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Renderer.prototype, "isRendering", {
        get: function () {
            return this._rendering;
        },
        enumerable: true,
        configurable: true
    });
    return Renderer;
}(EventEmitter_1.EventEmitter));
exports.Renderer = Renderer;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Renderer = (function () {
    function Renderer(width, height) {
        if (width === void 0) { width = 550; }
        if (height === void 0) { height = 400; }
        this._canvas = document.createElement("canvas");
        this._context = this._canvas.getContext("2d");
        this._rendering = false;
        this.resize(width, height);
    }
    Renderer.prototype.clear = function () {
        this._context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    };
    Renderer.prototype.renderFrame = function (scene) {
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
}());
exports.Renderer = Renderer;

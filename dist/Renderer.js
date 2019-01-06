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
var events_1 = require("events");
var Renderer = (function (_super) {
    __extends(Renderer, _super);
    function Renderer(width, height) {
        if (width === void 0) { width = 550; }
        if (height === void 0) { height = 400; }
        var _this = _super.call(this) || this;
        _this._canvas = document.createElement("canvas");
        _this._context = _this._canvas.getContext("2d");
        _this._renderTarget = null;
        _this._rendering = false;
        _this.resize(width, height);
        _this._canvas.addEventListener("click", function (evt) { return _this.emit("click", evt); });
        return _this;
    }
    Renderer.prototype.clear = function () {
        this._context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    };
    Renderer.prototype.renderFrame = function () {
        this.emit("render");
        this.clear();
        this._renderTarget.draw(this._context, 0, 0);
        if (this.isRendering) {
            requestAnimationFrame(this.renderFrame.bind(this));
        }
    };
    Renderer.prototype.startRendering = function (target) {
        this._rendering = true;
        this._renderTarget = target;
        requestAnimationFrame(this.renderFrame.bind(this));
    };
    Renderer.prototype.stopRendering = function () {
        this._rendering = false;
        this._renderTarget = null;
    };
    Renderer.prototype.resize = function (width, height) {
        this._canvas.width = width;
        this._canvas.height = height;
    };
    Renderer.prototype.injectInto = function (element) {
        var tag = (typeof element === "string") ? document.querySelector(element) : element;
        tag.appendChild(this._canvas);
    };
    Renderer.prototype.download = function (format, filename) {
        if (format === void 0) { format = "png"; }
        var a = document.createElement("a");
        var data = this._canvas.toDataURL("image/" + format.replace("jpg", "jpeg"));
        var fname = filename || "capture_" + Date.now();
        fname = fname.replace(".jpg", "").replace(".png", "");
        a.setAttribute("href", data);
        a.setAttribute("download", fname + "." + format);
        a.click();
    };
    Object.defineProperty(Renderer.prototype, "target", {
        get: function () {
            return this._renderTarget;
        },
        enumerable: true,
        configurable: true
    });
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
}(events_1.EventEmitter));
exports.Renderer = Renderer;

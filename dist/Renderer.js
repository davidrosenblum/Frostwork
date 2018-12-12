"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Renderer = (function () {
    function Renderer() {
        this._canvas = document.createElement("canvas");
        this._context = this._canvas.getContext("2d");
    }
    Renderer.prototype.render = function (scene) {
    };
    Object.defineProperty(Renderer.prototype, "canvas", {
        get: function () {
            return this._canvas;
        },
        enumerable: true,
        configurable: true
    });
    return Renderer;
}());
exports.Renderer = Renderer;

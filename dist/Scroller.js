"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BoundingBox_1 = require("./BoundingBox");
var Scroller = (function () {
    function Scroller(renderer, bounds) {
        this._bounds = new BoundingBox_1.BoundingBox(bounds.x, bounds.y, bounds.width, bounds.height);
        this._scroll = new BoundingBox_1.BoundingBox(0, 0, renderer.canvasWidth, renderer.canvasHeight);
        this._renderer = renderer;
    }
    Scroller.prototype.update = function () {
        this._renderer.target.x = -this._scroll.x;
        this._renderer.target.y = -this._scroll.y;
    };
    Scroller.prototype.scrollXWith = function (target, distance) {
        if (distance < 0) {
            if (target.centerX < this._scroll.centerX) {
                this.scrollX(distance);
            }
        }
        else {
            if (target.centerX > this._scroll.centerX) {
                this.scrollX(distance);
            }
        }
    };
    Scroller.prototype.scrollYWith = function (target, distance) {
        if (distance < 0) {
            if (target.centerY < this._scroll.centerY) {
                this.scrollY(distance);
            }
        }
        else {
            if (target.centerY > this._scroll.centerY) {
                this.scrollY(distance);
            }
        }
    };
    Scroller.prototype.scrollX = function (distance) {
        var offset = this._scroll.x + distance;
        if (offset >= this._bounds.x && offset + this._scroll.width <= this._bounds.right) {
            this._scroll.x = offset;
            this.update();
            return true;
        }
        return false;
    };
    Scroller.prototype.scrollY = function (distance) {
        var offset = this._scroll.y + distance;
        if (offset >= this._bounds.y && offset + this._scroll.height <= this._bounds.bottom) {
            this._scroll.y = offset;
            this.update();
            return true;
        }
        return false;
    };
    Scroller.prototype.scrollXIgnoreBounds = function (distance) {
        this._scroll.x += distance;
        this.update();
    };
    Scroller.prototype.scrollYIgnoreBounds = function (distance) {
        this._scroll.y += distance;
        this.update();
    };
    Scroller.prototype.lookAt = function (target) {
    };
    Scroller.prototype.reset = function () {
        this.scrollXIgnoreBounds(-this._scroll.x);
        this.scrollYIgnoreBounds(-this._scroll.y);
    };
    return Scroller;
}());
exports.Scroller = Scroller;

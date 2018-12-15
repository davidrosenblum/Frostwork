"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BoundingBox = (function () {
    function BoundingBox(x, y, width, height) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    BoundingBox.prototype.hitBoxTest = function (target) {
        if (target.x < this.right && this.x < target.right) {
            if (target.y < this.bottom && this.y < target.bottom) {
                return true;
            }
        }
        return false;
    };
    BoundingBox.prototype.hitBoxTests = function (targets) {
        for (var _i = 0, targets_1 = targets; _i < targets_1.length; _i++) {
            var target = targets_1[_i];
            if (this.hitBoxTest(target)) {
                return target;
            }
        }
        return null;
    };
    Object.defineProperty(BoundingBox.prototype, "centerX", {
        get: function () {
            return this.x + this.width / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoundingBox.prototype, "centerY", {
        get: function () {
            return this.y + this.height / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoundingBox.prototype, "right", {
        get: function () {
            return this.x + this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoundingBox.prototype, "bottom", {
        get: function () {
            return this.y + this.height;
        },
        enumerable: true,
        configurable: true
    });
    return BoundingBox;
}());
exports.BoundingBox = BoundingBox;

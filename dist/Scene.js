"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Scene = (function () {
    function Scene() {
        this._childIDs = {};
        this._drawList = [];
    }
    Scene.prototype.draw = function (ctx, offsetX, offsetY) {
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        this._drawList.forEach(function (child) { return child.draw(ctx, offsetX, offsetY); });
    };
    Scene.prototype.addChild = function (child) {
        if (!this.containsChild(child)) {
            this._childIDs[child.id] = child;
            this._drawList.push(child);
            return true;
        }
        return false;
    };
    Scene.prototype.addChildAt = function (child, index) {
        if (!this.containsChild(child)) {
            var updatedDrawList_1 = [];
            this._drawList.forEach(function (currChild, currIndex) {
                if (index === currIndex) {
                    updatedDrawList_1.push(child);
                }
                else {
                    updatedDrawList_1.push(currChild);
                }
            });
            this._drawList = updatedDrawList_1;
            return true;
        }
        return false;
    };
    Scene.prototype.addChildren = function (children) {
        var _this = this;
        children.forEach(function (child) { return _this.addChild(child); });
    };
    Scene.prototype.removeChild = function (child) {
        return this.removeChildAt(this.findChildIndex(child));
    };
    Scene.prototype.removeChildAt = function (index) {
        if (index in this._drawList) {
            var child = this.getChildAt(index);
            delete this._childIDs[child.id];
            this._drawList.splice(index, 1);
            return child;
        }
    };
    Scene.prototype.removeChildren = function (children) {
        var _this = this;
        if (children) {
            children.forEach(function (child) { return _this.removeChild(child); });
        }
        else {
            while (this.numChildren > 0) {
                this.removeChildAt(this.numChildren - 1);
            }
        }
    };
    Scene.prototype.containsChild = function (target) {
        return target.id in this._childIDs;
    };
    Scene.prototype.findChildIndex = function (target) {
        this._drawList.forEach(function (child, index) {
            if (child === target) {
                return index;
            }
        });
        return -1;
    };
    Scene.prototype.getChildById = function (id) {
        return this._childIDs[id] || null;
    };
    Scene.prototype.getChildAt = function (index) {
        return this._drawList[index] || null;
    };
    Object.defineProperty(Scene.prototype, "numChildren", {
        get: function () {
            return this._drawList.length;
        },
        enumerable: true,
        configurable: true
    });
    return Scene;
}());
exports.Scene = Scene;

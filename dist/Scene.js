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
    Scene.prototype.depthSort = function () {
        var a = null;
        var b = null;
        for (var i = 0; i < this.numChildren; i++) {
            a = this.getChildAt(i);
            for (var j = i + 1; j < this.numChildren; j++) {
                b = this.getChildAt(j);
                if (a.bottom < b.bottom) {
                    this._drawList[i] = b;
                    this._drawList[j] = a;
                    a = b;
                }
            }
        }
    };
    Scene.prototype.swapChildren = function (child1, child2) {
        var _this = this;
        var index1 = -1;
        var index2 = -1;
        this._drawList.forEach(function (child, index) {
            if (child === child1) {
                index1 === index;
            }
            else if (child === child2) {
                index2 === index;
            }
            if (index1 > -1 && index2 > -1) {
                return _this.swapChildrenAt(index1, index2);
            }
        });
        return false;
    };
    Scene.prototype.swapChildrenAt = function (index1, index2) {
        var a = this.getChildAt(index1);
        var b = this.getChildAt(index2);
        if (a && b) {
            this._drawList[index1] = b;
            this._drawList[index2] = a;
            return true;
        }
        return false;
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
    Scene.prototype.forEachChild = function (fn) {
        var i = 0;
        for (var _i = 0, _a = this._drawList; _i < _a.length; _i++) {
            var object = _a[_i];
            fn(object, i++);
        }
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

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
var CollisionObject = (function (_super) {
    __extends(CollisionObject, _super);
    function CollisionObject(width, height, x, y) {
        var _this = _super.call(this, width, height, x, y) || this;
        _this._collisionBounds = null;
        return _this;
    }
    return CollisionObject;
}(Object2D_1.Object2D));
exports.CollisionObject = CollisionObject;

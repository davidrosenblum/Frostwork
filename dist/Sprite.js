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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var AssetUtils_1 = require("./AssetUtils");
var Object2D_1 = require("./Object2D");
var Sprite = (function (_super) {
    __extends(Sprite, _super);
    function Sprite(image, width, height, x, y) {
        var _this = _super.call(this, width, height, x, y) || this;
        _this._image = Sprite.EMPTY_IMAGE;
        _this._collisionBounds = null;
        if (image)
            _this.setImage(image);
        return _this;
    }
    Sprite.create = function (config) {
        var sprite = new Sprite(config.image, config.width, config.height, config.x, config.y);
        if (config.depth) {
            sprite.depth = config.depth;
        }
        return sprite;
    };
    Sprite.prototype.draw = function (ctx, offsetX, offsetY) {
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        if (this.visible) {
            this.emit("draw");
            var x = this.x + offsetX;
            var y = this.y + offsetY;
            ctx.drawImage(this._image, x, y, this.width, this.height);
            this.drawChildren(ctx, x, y);
        }
    };
    Sprite.prototype.setImage = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var img, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, AssetUtils_1.AssetUtils.loadImage(url)];
                    case 1:
                        img = _a.sent();
                        this._image = img;
                        return [3, 3];
                    case 2:
                        err_1 = _a.sent();
                        this._image = Sprite.badImage || Sprite.EMPTY_IMAGE;
                        return [3, 3];
                    case 3: return [2, this._image];
                }
            });
        });
    };
    Sprite.prototype.hitBoxTest = function (target) {
        if (this.x < target.right && target.x < this.right) {
            if (this.y < target.bottom && target.y < this.bottom) {
                return true;
            }
        }
        return false;
    };
    Sprite.prototype.hitBoxTests = function (targets) {
        for (var _i = 0, targets_1 = targets; _i < targets_1.length; _i++) {
            var target = targets_1[_i];
            if (this.hitBoxTest(target)) {
                return target;
            }
        }
        return null;
    };
    Sprite.prototype.collisionTest = function (target) {
        var bounds1 = this._collisionBounds;
        var bounds2 = target.collisionBounds;
        if (this.x < target.x + bounds2.width && target.x < this.x + bounds1.width) {
            if (this.y < target.y + bounds2.height - bounds2.depth && target.y < this.y + bounds1.height - bounds1.depth) {
                return true;
            }
        }
        return false;
    };
    Sprite.prototype.collisionTests = function (targets) {
        for (var _i = 0, targets_2 = targets; _i < targets_2.length; _i++) {
            var target = targets_2[_i];
            if (this.collisionTest(target)) {
                return target;
            }
        }
        return null;
    };
    Sprite.prototype.setCustomCollisionBounds = function (width, height, depth) {
        this._collisionBounds = { width: width, height: height, depth: depth || height - width };
    };
    Sprite.prototype.useDefaultCollisionBounds = function () {
        this._collisionBounds = null;
    };
    Object.defineProperty(Sprite.prototype, "collisionBounds", {
        get: function () {
            return this._collisionBounds || this.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "imageElement", {
        get: function () {
            return this._image;
        },
        enumerable: true,
        configurable: true
    });
    Sprite.EMPTY_IMAGE = document.createElement("img");
    Sprite.badImage = null;
    return Sprite;
}(Object2D_1.Object2D));
exports.Sprite = Sprite;

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
var Sprite_1 = require("./Sprite");
var AnimatedSprite = (function (_super) {
    __extends(AnimatedSprite, _super);
    function AnimatedSprite(image, width, height, x, y) {
        var _this = _super.call(this, image, width, height, x, y) || this;
        _this._currAnim = null;
        _this._currFrame = 0;
        _this._animations = {};
        _this._animating = false;
        return _this;
    }
    AnimatedSprite.prototype.draw = function (ctx, offsetX, offsetY) {
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        if (this.visible) {
            if (this.isAnimating) {
                this.emit("draw");
                var x = this.x + offsetX;
                var y = this.y + offsetY;
                var anim = this._animations[this._currAnim][this._currFrame];
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.drawImage(this.imageElement, anim.clipX, anim.clipY, anim.clipWidth, anim.clipHeight, x, y, this.width, this.height);
                ctx.restore();
                this.drawChildren(ctx, x, y);
            }
            else
                _super.prototype.draw.call(this, ctx, offsetX, offsetY);
        }
    };
    AnimatedSprite.prototype.nextFrame = function () {
        if (++this._currFrame >= this.currentFrameCount) {
            this._currFrame = 0;
        }
    };
    AnimatedSprite.prototype.prevFrame = function () {
        if (--this._currFrame < 0) {
            var cfc = this.currentFrameCount;
            this._currFrame = cfc > 0 ? (cfc - 1) : 0;
        }
    };
    AnimatedSprite.prototype.playAnimation = function (animationName) {
        if (this.hasAnimation(animationName) && animationName !== this.currentAnimation) {
            this.restartAnimation();
            this._animating = true;
        }
    };
    AnimatedSprite.prototype.stopAnimation = function () {
        this._animating = false;
    };
    AnimatedSprite.prototype.restartAnimation = function () {
        this._currFrame = 0;
    };
    AnimatedSprite.prototype.setAnimation = function (animationName, frames) {
        var _this = this;
        this._animations[animationName] = new Array(frames.length);
        frames.forEach(function (frame, i) { return _this._animations[animationName][i] = frame; });
        if (this._currAnim = animationName) {
            this.restartAnimation();
        }
    };
    AnimatedSprite.prototype.hasAnimation = function (animationName) {
        return animationName in this._animations;
    };
    Object.defineProperty(AnimatedSprite.prototype, "currentFrameCount", {
        get: function () {
            return this._currAnim ? this._animations[this._currAnim].length : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnimatedSprite.prototype, "currentAnimation", {
        get: function () {
            return this._currAnim;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnimatedSprite.prototype, "currentFrame", {
        get: function () {
            return this._currFrame;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnimatedSprite.prototype, "isAnimating", {
        get: function () {
            return this._animating;
        },
        enumerable: true,
        configurable: true
    });
    return AnimatedSprite;
}(Sprite_1.Sprite));
exports.AnimatedSprite = AnimatedSprite;

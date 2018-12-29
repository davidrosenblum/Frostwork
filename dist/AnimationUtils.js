"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AnimationUtils = (function () {
    function AnimationUtils() {
    }
    AnimationUtils.createAnimation = function (config) {
        var numSrcFrames = config.numSrcFrames, axis = config.axis, clipWidth = config.clipWidth, clipHeight = config.clipHeight, _a = config.offsetX, offsetX = _a === void 0 ? 0 : _a, _b = config.offsetY, offsetY = _b === void 0 ? 0 : _b, _c = config.marginX, marginX = _c === void 0 ? 0 : _c, _d = config.marginY, marginY = _d === void 0 ? 0 : _d, _e = config.numRepeatFrames, numRepeatFrames = _e === void 0 ? 0 : _e;
        var clipX = offsetX;
        var clipY = offsetY;
        var frameCount = numRepeatFrames > 0 ? (numRepeatFrames / numSrcFrames) : 1;
        var frames = new Array(numSrcFrames);
        for (var i = 0; i < numSrcFrames; i++) {
            if (axis === "x") {
                clipX += i * (clipWidth + marginX);
            }
            else if (axis === "y") {
                clipY += i * (clipHeight + marginY);
            }
            frames[i] = { clipX: clipX, clipY: clipY, clipWidth: clipWidth, clipHeight: clipHeight, frameCount: frameCount };
        }
        return frames;
    };
    return AnimationUtils;
}());
exports.AnimationUtils = AnimationUtils;

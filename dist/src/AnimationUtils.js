"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AnimationUtils = (function () {
    function AnimationUtils() {
    }
    AnimationUtils.createAnimation = function (config) {
        var numFrames = config.numFrames, axis = config.axis, clipWidth = config.clipWidth, clipHeight = config.clipHeight, _a = config.offsetX, offsetX = _a === void 0 ? 0 : _a, _b = config.offsetY, offsetY = _b === void 0 ? 0 : _b, _c = config.marginX, marginX = _c === void 0 ? 0 : _c, _d = config.marginY, marginY = _d === void 0 ? 0 : _d;
        var clipX = offsetX;
        var clipY = offsetY;
        var frames = new Array(numFrames);
        for (var i = 0; i < frames.length; i++) {
            if (axis === "x") {
                clipX += i * (clipWidth + marginX);
            }
            else if (axis === "y") {
                clipY += i * (clipHeight + marginY);
            }
            frames[i] = { clipX: clipX, clipY: clipY, clipWidth: clipWidth, clipHeight: clipHeight };
        }
        return frames;
    };
    return AnimationUtils;
}());
exports.AnimationUtils = AnimationUtils;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameEntityFacing;
(function (GameEntityFacing) {
    GameEntityFacing["UP"] = "up";
    GameEntityFacing["DOWN"] = "down";
    GameEntityFacing["LEFT"] = "left";
    GameEntityFacing["RIGHT"] = "right";
})(GameEntityFacing = exports.GameEntityFacing || (exports.GameEntityFacing = {}));
var GameLayer;
(function (GameLayer) {
    GameLayer[GameLayer["BACKGROUND"] = 1] = "BACKGROUND";
    GameLayer[GameLayer["MIDGROUND"] = 2] = "MIDGROUND";
    GameLayer[GameLayer["FOREGROUND"] = 3] = "FOREGROUND";
    GameLayer[GameLayer["HUD"] = 4] = "HUD";
})(GameLayer = exports.GameLayer || (exports.GameLayer = {}));

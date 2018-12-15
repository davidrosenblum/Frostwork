"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = require("./Errors");
var Sprite_1 = require("./Sprite");
var MapLayersContainer = (function () {
    function MapLayersContainer() {
        this._container = new Sprite_1.Sprite();
        this._layers = {};
        this._layers[1] = new Sprite_1.Sprite();
        this._layers[2] = new Sprite_1.Sprite();
        this._layers[3] = new Sprite_1.Sprite();
        this._layers[4] = new Sprite_1.Sprite();
    }
    MapLayersContainer.prototype.add = function (object, layer) {
        if (layer === void 0) { layer = 2; }
        if (layer in this._layers) {
            return this._layers[layer].scene.addChild(object);
        }
        else
            throw new Errors_1.InvalidLayerError();
    };
    MapLayersContainer.prototype.remove = function (object, layer) {
        if (layer === void 0) { layer = 2; }
        if (layer in this._layers) {
            return this._layers[layer].scene.removeChild(object) !== null;
        }
        else
            throw new Errors_1.InvalidLayerError();
    };
    MapLayersContainer.prototype.removeAll = function () {
        this.forEachScene(function (scene) { return scene.removeChildren(); });
    };
    MapLayersContainer.prototype.forEachScene = function (fn) {
        for (var layer in this._layers) {
            fn(this._layers[layer].scene);
        }
    };
    MapLayersContainer.prototype.countChildren = function () {
        var num = 0;
        this.forEachScene(function (scene) { return num += scene.numChildren; });
        return num;
    };
    Object.defineProperty(MapLayersContainer.prototype, "scene", {
        get: function () {
            return this._container.scene;
        },
        enumerable: true,
        configurable: true
    });
    return MapLayersContainer;
}());
exports.MapLayersContainer = MapLayersContainer;

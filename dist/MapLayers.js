"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = require("./Errors");
var MapUtils_1 = require("./MapUtils");
var Sprite_1 = require("./Sprite");
var MapLayers = (function () {
    function MapLayers() {
        this._container = new Sprite_1.Sprite();
        this._layers = {};
        this._layers[1] = new Sprite_1.Sprite();
        this._layers[2] = new Sprite_1.Sprite();
        this._layers[3] = new Sprite_1.Sprite();
        this._layers[4] = new Sprite_1.Sprite();
        for (var layer in this._layers) {
            this._container.scene.addChild(this._layers[layer]);
        }
    }
    MapLayers.prototype.buildMap = function (config) {
        return MapUtils_1.MapUtils.buildLayerMap(config, this._layers[1].scene, this._layers[2].scene, this._layers[3].scene);
    };
    MapLayers.prototype.add = function (object, layer) {
        if (layer === void 0) { layer = 2; }
        if (layer in this._layers) {
            return this._layers[layer].scene.addChild(object);
        }
        else
            throw new Errors_1.InvalidLayerError();
    };
    MapLayers.prototype.remove = function (object, layer) {
        if (layer === void 0) { layer = 2; }
        if (layer in this._layers) {
            return this._layers[layer].scene.removeChild(object) !== null;
        }
        else
            throw new Errors_1.InvalidLayerError();
    };
    MapLayers.prototype.removeAll = function () {
        this.forEachScene(function (scene) { return scene.removeChildren(); });
    };
    MapLayers.prototype.forEachScene = function (fn) {
        for (var layer in this._layers) {
            fn(this._layers[layer].scene);
        }
    };
    MapLayers.prototype.depthSort = function () {
        this._layers[2].scene.depthSort();
    };
    MapLayers.prototype.countChildren = function () {
        var num = 0;
        this.forEachScene(function (scene) { return num += scene.numChildren; });
        return num;
    };
    Object.defineProperty(MapLayers.prototype, "scene", {
        get: function () {
            return this._container.scene;
        },
        enumerable: true,
        configurable: true
    });
    return MapLayers;
}());
exports.MapLayers = MapLayers;

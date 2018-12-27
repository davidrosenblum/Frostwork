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
var Errors_1 = require("./Errors");
var MapUtils_1 = require("./MapUtils");
var Object2D_1 = require("./Object2D");
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
        this._mapGrid = null;
    }
    MapLayers.prototype.toggleMapGrid = function () {
        if (this._mapGrid) {
            this._mapGrid.parent ? this._mapGrid.remove() : this.add(this._mapGrid, 4);
        }
    };
    MapLayers.prototype.createMapGrid = function (config) {
        this._mapGrid = new MapTileGrid(config.tileSize, config.tileSize);
        if (config.midground) {
            this._mapGrid.x = config.midground.offsetX;
            this._mapGrid.y = config.midground.offsetY;
        }
    };
    MapLayers.prototype.buildMap = function (config) {
        this.createMapGrid(config);
        var gmd = MapUtils_1.MapUtils.buildLayerMap(config, this._layers[1].scene, this._layers[2].scene, this._layers[3].scene);
        this.depthSort();
        return gmd;
    };
    MapLayers.prototype.addAt = function (object, col, row, layer) {
        if (layer === void 0) { layer = 2; }
        if (this._mapGrid) {
            if (this.add(object, layer)) {
                object.x = col * this._mapGrid.width;
                object.y = row * this._mapGrid.height;
                if (object.height > this._mapGrid.height) {
                    object.height -= (this._mapGrid.height);
                }
                return true;
            }
            return false;
        }
        else
            throw new Error("Unable to 'addAt()' if no map has been generated");
    };
    MapLayers.prototype.add = function (object, layer, depthSort) {
        if (layer === void 0) { layer = 2; }
        if (depthSort === void 0) { depthSort = true; }
        if (layer in this._layers) {
            if (this._layers[layer].scene.addChild(object)) {
                if (depthSort) {
                    this.depthSort();
                }
                return true;
            }
            return false;
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
    Object.defineProperty(MapLayers.prototype, "mapSprite", {
        get: function () {
            return this._container;
        },
        enumerable: true,
        configurable: true
    });
    return MapLayers;
}());
exports.MapLayers = MapLayers;
var MapTileGrid = (function (_super) {
    __extends(MapTileGrid, _super);
    function MapTileGrid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MapTileGrid.prototype.draw = function (ctx, offsetX, offsetY) {
        for (var row = 0; row < this.height; row++) {
            for (var col = 0; col < this.width; col++) {
                var x = col * this.width + offsetX;
                var y = row * this.height + offsetY;
                ctx.strokeRect(x, y, this.width, this.height);
            }
        }
    };
    return MapTileGrid;
}(Object2D_1.Object2D));

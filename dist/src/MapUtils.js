"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CollisionGrid_1 = require("./CollisionGrid");
var MapUtils = (function () {
    function MapUtils() {
    }
    MapUtils.buildGrid = function (config) {
        var tileLayout = config.tileLayout, tileTypes = config.tileTypes, tileSize = config.tileSize;
        var rows = tileLayout[0].length;
        var cols = tileLayout.length;
        var grid = new CollisionGrid_1.CollisionGrid(rows, cols, tileSize);
        for (var row = 0; row < tileLayout.length; row++) {
            for (var col = 0; col < tileLayout[row].length; col++) {
                var typeID = tileLayout[row][col] || -1;
                var type = tileTypes[typeID] || null;
                if (type) {
                    var tile = new type();
                    tile.x = col * tileSize;
                    tile.y = row * tileSize;
                    if (tile.height > tileSize) {
                        tile.y -= (tile.height - tileSize);
                    }
                    grid.storeObjectAt(tile, row, col);
                    if (config.scene) {
                        config.scene.addChild(tile);
                    }
                }
            }
        }
        return grid;
    };
    MapUtils.buildLayerMap = function (config, backgroundScene, midgroundScene, foregroundScene) {
        var collisionGrid = null;
        var scenes = [backgroundScene, midgroundScene, foregroundScene];
        var layerConfigs = [config.background || null, config.midground || null, config.foreground || null];
        layerConfigs.forEach(function (layerConfig, index) {
            if (layerConfig) {
                var cfg = {
                    tileLayout: layerConfig.tileLayout,
                    tileTypes: layerConfig.tileTypes,
                    tileSize: config.tileSize,
                    scene: index in scenes ? scenes[index] : null
                };
                var grid = MapUtils.buildGrid(cfg);
                if (layerConfig === config.midground) {
                    collisionGrid = grid;
                }
            }
        });
        return collisionGrid;
    };
    return MapUtils;
}());
exports.MapUtils = MapUtils;

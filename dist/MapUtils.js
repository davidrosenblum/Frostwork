"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CollisionGrid_1 = require("./CollisionGrid");
var BoundingBox_1 = require("./BoundingBox");
var MapUtils = (function () {
    function MapUtils() {
    }
    MapUtils.buildGrid = function (config) {
        var tileLayout = config.tileLayout, tileTypes = config.tileTypes, tileSize = config.tileSize;
        var rows = tileLayout[0].length;
        var cols = tileLayout.length;
        var collisionGrid = new CollisionGrid_1.CollisionGrid(rows, cols, tileSize);
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
                    if (tile.width > tileSize) {
                    }
                    collisionGrid.storeObjectAt(tile, col, row);
                    if (config.scene) {
                        config.scene.addChild(tile);
                    }
                }
            }
        }
        var mapBounds = new BoundingBox_1.BoundingBox(0, 0, rows * tileSize, cols * tileSize);
        return { collisionGrid: collisionGrid, mapBounds: mapBounds };
    };
    MapUtils.buildLayerMap = function (config, backgroundScene, midgroundScene, foregroundScene) {
        var collisionGrid = null;
        var mapBounds = null;
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
                var mapData = MapUtils.buildGrid(cfg);
                if (layerConfig === config.midground) {
                    collisionGrid = mapData.collisionGrid;
                    mapBounds = mapData.mapBounds;
                }
            }
        });
        return { collisionGrid: collisionGrid, mapBounds: mapBounds };
    };
    return MapUtils;
}());
exports.MapUtils = MapUtils;

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
        tileLayout.forEach(function (row, y) {
            row.forEach(function (col, x) {
                var typeID = tileLayout[y][x] || -1;
                var type = tileTypes[typeID] || null;
                if (type) {
                    var tile = new type();
                    tile.x = x * tileSize;
                    tile.y = y * tileSize;
                    if (tile.height > tileSize) {
                        tile.y -= (tile.height - tileSize);
                    }
                    grid.storeObjectAt(tile, x, y);
                    if (config.scene) {
                        config.scene.addChild(tile);
                    }
                }
            });
        });
        return grid;
    };
    return MapUtils;
}());
exports.MapUtils = MapUtils;

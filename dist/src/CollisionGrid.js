"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CollisionGrid = (function () {
    function CollisionGrid(rows, cols, tileSize) {
        this._tileSize = tileSize;
        this._grid = new Array(rows);
        for (var i = 0; i < cols; i++) {
            this._grid[i] = new Array(cols);
        }
    }
    CollisionGrid.prototype.checkInBounds = function (row, col) {
        return (row >= 0 && row < this._grid[0].length) &&
            (col >= 0 && col < this._grid.length);
    };
    CollisionGrid.prototype.storeObjectAt = function (object, row, col) {
        if (this.checkInBounds(row, col)) {
            this._grid[row][col] = object;
        }
    };
    CollisionGrid.prototype.getObjectAt = function (row, col) {
        if (this.checkInBounds(row, col)) {
            return this._grid[row][col] || null;
        }
        return null;
    };
    CollisionGrid.prototype.getObjectAtPixels = function (x, y) {
        var row = Math.round(x / this._tileSize);
        var col = Math.round(y / this._tileSize);
        return this.getObjectAt(row, col);
    };
    CollisionGrid.prototype.getObjectAtPoint = function (point) {
        return this.getObjectAtPixels(point.x, point.y);
    };
    return CollisionGrid;
}());
exports.CollisionGrid = CollisionGrid;
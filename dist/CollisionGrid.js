"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CollisionGrid = (function () {
    function CollisionGrid(rows, cols, tileSize) {
        this._tileSize = tileSize;
        this._grid = new Array(rows);
        for (var i = 0; i < cols; i++) {
            this._grid[i] = new Array(cols).fill(null);
        }
    }
    CollisionGrid.prototype.checkInBounds = function (col, row) {
        return row in this._grid && col in this._grid[row];
    };
    CollisionGrid.prototype.storeObjectAt = function (object, col, row) {
        if (this.checkInBounds(col, row)) {
            this._grid[row][col] = object;
        }
    };
    CollisionGrid.prototype.getObjectAt = function (col, row) {
        if (this.checkInBounds(row, col)) {
            return this._grid[row][col] || null;
        }
        return null;
    };
    CollisionGrid.prototype.getObjectAtPoint = function (point) {
        return this.getObjectAt(point.x, point.y);
    };
    CollisionGrid.prototype.getObjectAtPixels = function (x, y) {
        var col = Math.round(x / this._tileSize);
        var row = Math.round(y / this._tileSize);
        return this.getObjectAt(col, row);
    };
    CollisionGrid.prototype.getObjectAtPixelsPoint = function (point) {
        return this.getObjectAtPixels(point.x, point.y);
    };
    CollisionGrid.prototype.getObjectAtTarget = function (target, offsetX, offsetY) {
        var pt = target.getCoords(this._tileSize, offsetX, offsetY);
        return this.getObjectAt(pt.x, pt.y);
    };
    return CollisionGrid;
}());
exports.CollisionGrid = CollisionGrid;

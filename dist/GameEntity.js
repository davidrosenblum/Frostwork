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
var AnimatedSprite_1 = require("./AnimatedSprite");
var Enums_1 = require("./Enums");
var TextField_1 = require("./TextField");
var GameEntity = (function (_super) {
    __extends(GameEntity, _super);
    function GameEntity(image, width, height, x, y) {
        var _this = _super.call(this, image, width, height, x, y) || this;
        _this._moveSpeed = 1;
        _this._facing = Enums_1.GameEntityFacing.RIGHT;
        _this.canMove = true;
        return _this;
    }
    GameEntity.prototype.getHit = function (grid) {
        if (grid) {
            var hit = grid.getObjectAtPixels(this.x, this.y);
            return this.collisionTest(hit) ? hit : null;
        }
        return null;
    };
    GameEntity.prototype.setNametag = function (name, font, fillStyle, strokeStyle) {
        if (this._nametag) {
            this._nametag.remove();
        }
        if (name) {
            this._nametag = new TextField_1.TextField(name, 0, 0, font, fillStyle, strokeStyle);
            this.scene.addChild(this._nametag);
            this._nametag.centerText();
            this._nametag.y -= this._nametag.height;
        }
    };
    GameEntity.prototype.move = function (grid, bounds, scroller) {
        if (this.canMove) {
            switch (this.facing) {
                case Enums_1.GameEntityFacing.UP:
                    this.moveLeft(grid, bounds, scroller);
                    break;
                case Enums_1.GameEntityFacing.DOWN:
                    this.moveDown(grid, bounds, scroller);
                    break;
                case Enums_1.GameEntityFacing.LEFT:
                    this.moveLeft(grid, bounds, scroller);
                    break;
                case Enums_1.GameEntityFacing.RIGHT:
                    this.moveRight(grid, bounds, scroller);
                    break;
            }
        }
    };
    GameEntity.prototype.moveUp = function (grid, bounds, scroller) {
        if (!this.canMove)
            return null;
        var y = this.y - this.moveSpeed;
        if (grid) {
            var hit = grid.getObjectAtPixels(this.x, y);
            if (hit && this.collisionTest(hit)) {
                return hit;
            }
        }
        if (bounds && y < bounds.y) {
            y = bounds.y;
        }
        if (scroller) {
        }
        this.y = y;
        this.facing = Enums_1.GameEntityFacing.UP;
        return null;
    };
    GameEntity.prototype.moveDown = function (grid, bounds, scroller) {
        if (!this.canMove)
            return null;
        var y = this.y + this.moveSpeed;
        if (grid) {
            var hit = grid.getObjectAtPixels(this.x, y + this.height);
            if (hit && this.collisionTest(hit)) {
                return hit;
            }
        }
        if (bounds) {
            var boundsBottom = bounds.y + bounds.height;
            if (y + this.height > boundsBottom) {
                y = boundsBottom - this.height;
            }
        }
        if (scroller) {
        }
        this.y = y;
        this.facing = Enums_1.GameEntityFacing.DOWN;
        return null;
    };
    GameEntity.prototype.moveLeft = function (grid, bounds, scroller) {
        if (!this.canMove)
            return null;
        var x = this.x - this.moveSpeed;
        if (grid) {
            var hit = grid.getObjectAtPixels(x, this.y);
            if (hit && this.collisionTest(hit)) {
                return hit;
            }
        }
        if (bounds && x < bounds.x) {
            x = bounds.x;
        }
        if (scroller) {
        }
        this.x = x;
        this.facing = Enums_1.GameEntityFacing.LEFT;
        return null;
    };
    GameEntity.prototype.moveRight = function (grid, bounds, scroller) {
        if (!this.canMove)
            return null;
        var x = this.x + this.moveSpeed;
        if (grid) {
            var hit = grid.getObjectAtPixels(x, this.bottom);
            if (hit && this.collisionTest(hit)) {
                return hit;
            }
        }
        if (bounds) {
            var boundsRight = bounds.x + bounds.width;
            if (x + this.width > boundsRight) {
                x = boundsRight - this.width;
            }
        }
        if (scroller) {
        }
        this.x = x;
        this.facing = Enums_1.GameEntityFacing.RIGHT;
        return null;
    };
    Object.defineProperty(GameEntity.prototype, "moveSpeed", {
        get: function () {
            return this._moveSpeed;
        },
        set: function (moveSpeed) {
            this._moveSpeed = Math.abs(moveSpeed);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameEntity.prototype, "facing", {
        get: function () {
            return this._facing;
        },
        set: function (facing) {
            if (this._facing !== facing) {
                this.emit("facing");
            }
            this._facing = facing;
            this.restartAnimation();
        },
        enumerable: true,
        configurable: true
    });
    return GameEntity;
}(AnimatedSprite_1.AnimatedSprite));
exports.GameEntity = GameEntity;

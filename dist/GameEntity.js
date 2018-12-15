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
var TextField_1 = require("./TextField");
var GameEntity = (function (_super) {
    __extends(GameEntity, _super);
    function GameEntity(image, width, height, x, y) {
        var _this = _super.call(this, image, width, height, x, y) || this;
        _this._moveSpeed = 1;
        _this._facing = "right";
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
                case "up":
                    this.moveLeft(grid, bounds, scroller);
                    break;
                case "down":
                    this.moveDown(grid, bounds, scroller);
                    break;
                case "left":
                    this.moveLeft(grid, bounds, scroller);
                    break;
                case "right":
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
            var hit = grid.getObjectAtTarget(this, 0, -this.collisionBounds.height / 2);
            if (hit && this.collisionTest(hit)) {
                return hit;
            }
        }
        if (bounds && y < bounds.y) {
            y = bounds.y;
        }
        if (scroller) {
            scroller.scrollYWith(this, y - this.y);
        }
        this.y = y;
        this.facing = "up";
        return null;
    };
    GameEntity.prototype.moveDown = function (grid, bounds, scroller) {
        if (!this.canMove)
            return null;
        var y = this.y + this.moveSpeed;
        if (grid) {
            var hit = grid.getObjectAtTarget(this, 0, this.collisionBounds.height / 2);
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
            scroller.scrollYWith(this, y - this.y);
        }
        this.y = y;
        this.facing = "down";
        return null;
    };
    GameEntity.prototype.moveLeft = function (grid, bounds, scroller) {
        if (!this.canMove)
            return null;
        var x = this.x - this.moveSpeed;
        if (grid) {
            var hit = grid.getObjectAtTarget(this, -this.collisionBounds.width / 2);
            if (hit && this.collisionTest(hit)) {
                return hit;
            }
        }
        if (bounds && x < bounds.x) {
            x = bounds.x;
        }
        if (scroller) {
            if (scroller) {
                scroller.scrollXWith(this, x - this.x);
            }
        }
        this.x = x;
        this.facing = "left";
        return null;
    };
    GameEntity.prototype.moveRight = function (grid, bounds, scroller) {
        if (!this.canMove)
            return null;
        var x = this.x + this.moveSpeed;
        if (grid) {
            var hit = grid.getObjectAtTarget(this, this.collisionBounds.width / 2);
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
            scroller.scrollXWith(this, x - this.x);
        }
        this.x = x;
        this.facing = "right";
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
            var oldFacing = this._facing;
            this._facing = facing;
            this.restartAnimation();
            if (oldFacing !== facing) {
                this.emit("facing");
            }
        },
        enumerable: true,
        configurable: true
    });
    GameEntity.prototype.toString = function () {
        return "[object GameEntity]";
    };
    return GameEntity;
}(AnimatedSprite_1.AnimatedSprite));
exports.GameEntity = GameEntity;

import { AnimatedSprite } from "./AnimatedSprite";
import { CollisionGrid } from "./CollisionGrid";
import { GameEntityFacing } from "./Enums";
import { Bounds } from "./Interfaces";
import { Scroller } from "./Scroller";
import { Sprite } from "./Sprite";
export declare class GameEntity extends AnimatedSprite {
    private _moveSpeed;
    private _facing;
    canMove: boolean;
    constructor(image?: string, width?: number, height?: number, x?: number, y?: number);
    move(grid?: CollisionGrid<Sprite>, bounds?: Bounds, scroller?: Scroller): void;
    moveLeft(grid: CollisionGrid<Sprite>, bounds?: Bounds, scroller?: Scroller): Sprite;
    moveSpeed: number;
    facing: GameEntityFacing;
}

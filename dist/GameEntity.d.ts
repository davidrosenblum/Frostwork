import { AnimatedSprite } from "./AnimatedSprite";
import { CollisionGrid } from "./CollisionGrid";
import { GameEntityFacing } from "./Enums";
import { Bounds } from "./Interfaces";
import { Scroller } from "./Scroller";
import { Sprite } from "./Sprite";
export declare class GameEntity extends AnimatedSprite {
    private _moveSpeed;
    private _facing;
    private _nametag;
    canMove: boolean;
    constructor(image?: string, width?: number, height?: number, x?: number, y?: number);
    private getHit;
    setNametag(name?: string, font?: string, fillStyle?: string, strokeStyle?: string): void;
    move(grid?: CollisionGrid<Sprite>, bounds?: Bounds, scroller?: Scroller): void;
    moveUp(grid: CollisionGrid<Sprite>, bounds?: Bounds, scroller?: Scroller): Sprite;
    moveDown(grid: CollisionGrid<Sprite>, bounds?: Bounds, scroller?: Scroller): Sprite;
    moveLeft(grid: CollisionGrid<Sprite>, bounds?: Bounds, scroller?: Scroller): Sprite;
    moveRight(grid: CollisionGrid<Sprite>, bounds?: Bounds, scroller?: Scroller): Sprite;
    moveSpeed: number;
    facing: GameEntityFacing;
    toString(): string;
}

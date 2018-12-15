import { BoundingBox } from "./BoundingBox";
import { DisplayObject } from "./DisplayObject";
import { Size, SortableDraw2D } from "./Interfaces";
import { Scene } from "./Scene";
export declare abstract class Object2D extends DisplayObject implements SortableDraw2D {
    private _collisionBounds;
    private _scene;
    private _parent;
    constructor(width?: number, height?: number, x?: number, y?: number);
    protected drawChildren(ctx: CanvasRenderingContext2D, x: number, y: number): void;
    remove(): void;
    hitBoxTest(target: Object2D): boolean;
    hitBoxTests(targets: Object2D[]): Object2D;
    collisionTest(target: Object2D): boolean;
    collisionTests(targets: Object2D[]): Object2D;
    useDefaultCollisionBounds(): void;
    setCustomCollisionBounds(width: number, height: number, depth?: number): void;
    setParent(parent: Object2D): void;
    getBoundingBox(): BoundingBox;
    readonly collisionBounds: Size;
    readonly scene: Scene;
    readonly parent: Object2D;
}
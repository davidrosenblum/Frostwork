import { BoundingBox } from "./BoundingBox";
import { DisplayObject, Point, Size } from "./DisplayObject";
import { Scene } from "./Scene";
export interface Bounds {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare abstract class Object2D extends DisplayObject {
    private _collisionBounds;
    private _scene;
    private _parent;
    constructor(width?: number, height?: number, x?: number, y?: number);
    protected drawChildren(ctx: CanvasRenderingContext2D, x: number, y: number): void;
    drawHitbox(ctx: CanvasRenderingContext2D, x: number, y: number, strokeStyle?: string): void;
    remove(): void;
    collisionTest(target: Object2D): boolean;
    collisionTests(targets: Object2D[]): Object2D;
    useDefaultCollisionBounds(): void;
    setCustomCollisionBounds(width: number, height: number): void;
    setParent(parent: Object2D): void;
    getBoundingBox(): BoundingBox;
    getCollisionBox(): BoundingBox;
    getCoords(tileSize: number, offsetX?: number, offsetY?: number): Point;
    readonly collisionBounds: Size;
    readonly scene: Scene;
    readonly parent: Object2D;
}

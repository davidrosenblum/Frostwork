import { Point } from "./DisplayObject";
import { Object2D } from "./Object2D";
export declare class CollisionGrid<T extends Object2D> {
    private _grid;
    private _tileSize;
    constructor(rows: number, cols: number, tileSize: number);
    checkInBounds(col: number, row: number): boolean;
    storeObjectAt(object: T, col: number, row: number): void;
    getObjectAt(col: number, row: number): T;
    getObjectAtPoint(point: Point): T;
    getObjectAtPixels(x: number, y: number): T;
    getObjectAtPixelsPoint(point: Point): T;
    getObjectAtTarget(target: Object2D, offsetX?: number, offsetY?: number): T;
}

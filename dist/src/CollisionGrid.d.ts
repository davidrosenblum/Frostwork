import { Point } from "./Interfaces";
export declare class CollisionGrid<T> {
    private _grid;
    private _tileSize;
    constructor(rows: number, cols: number, tileSize: number);
    checkInBounds(row: number, col: number): boolean;
    storeObjectAt(object: T, row: number, col: number): void;
    getObjectAt(row: number, col: number): T;
    getObjectAtPixels(x: number, y: number): T;
    getObjectAtPoint(point: Point): T;
}

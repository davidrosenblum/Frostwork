import { CollisionObject, Point } from "./Interfaces";
export declare class CollisionGrid<T extends CollisionObject<T>> {
    private _grid;
    private _tileSize;
    constructor(rows: number, cols: number, tileSize: number);
    checkInBounds(row: number, col: number): boolean;
    storeObjectAt(object: T, row: number, col: number): void;
    getObjectAt(row: number, col: number): T;
    getObjectAtPoint(point: Point): T;
}

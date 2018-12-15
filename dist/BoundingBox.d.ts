import { Bounds, Point } from "./Interfaces";
export declare class BoundingBox implements Bounds, Point {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x?: number, y?: number, width?: number, height?: number);
    hitBoxTest(target: BoundingBox): boolean;
    hitBoxTests(targets: BoundingBox[]): BoundingBox;
    readonly centerX: number;
    readonly centerY: number;
    readonly right: number;
    readonly bottom: number;
}

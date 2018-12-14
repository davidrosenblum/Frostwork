import { Bounds } from "./Interfaces";
export declare class BoundingBox implements Bounds {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x?: number, y?: number, width?: number, height?: number);
    readonly centerX: number;
    readonly centerY: number;
    readonly right: number;
    readonly bottom: number;
}

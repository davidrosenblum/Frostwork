import { EventEmitter } from "events";
export interface Draw2D {
    draw(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number): void;
}
export interface Point {
    x: number;
    y: number;
}
export interface Size {
    width: number;
    height: number;
}
export declare abstract class DisplayObject extends EventEmitter implements Draw2D, Point, Size {
    private static tokens;
    private _id;
    private _bounds;
    private _alpha;
    visible: boolean;
    constructor(width?: number, height?: number, x?: number, y?: number);
    abstract draw(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number): void;
    setPosition(x: number, y: number): void;
    setSize(width: number, height: number): void;
    x: number;
    y: number;
    width: number;
    height: number;
    alpha: number;
    readonly position: Point;
    readonly size: Size;
    readonly centerX: number;
    readonly centerY: number;
    readonly bottom: number;
    readonly right: number;
    readonly id: string;
}

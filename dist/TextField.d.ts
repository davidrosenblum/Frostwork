import { Object2D } from "./Object2D";
import { SortableDraw2D } from "./Interfaces";
export declare class TextField extends Object2D implements SortableDraw2D {
    private static readonly CANVAS;
    private static readonly CTX;
    static defaultFont: string;
    static defaultStrokeColor: string;
    static defaultFillColor: string;
    private _text;
    private _font;
    private _fillStyle;
    private _strokeStyle;
    private _maxWidth;
    constructor(text?: string, x?: number, y?: number, font?: string, fillStyle?: string, strokeStyle?: string);
    draw(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void;
    text: string;
    font: string;
    strokeStyle: string;
    fillStyle: string;
    maxWidth: number;
    width: number;
    height: number;
    readonly right: number;
    readonly bottom: number;
}

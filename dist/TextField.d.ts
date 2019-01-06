import { Object2D } from "./Object2D";
export declare class TextField extends Object2D {
    private static readonly CANVAS;
    private static readonly CTX;
    static defaultFont: string;
    static defaultFillColor: string;
    static defaultStrokeColor: string;
    private _text;
    private _font;
    private _fillStyle;
    private _strokeStyle;
    private _maxWidth;
    constructor(text?: string, x?: number, y?: number, font?: string, fillStyle?: string, strokeStyle?: string);
    draw(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void;
    centerText(): void;
    text: string;
    font: string;
    fillStyle: string;
    strokeStyle: string;
    maxWidth: number;
    width: number;
    height: number;
}

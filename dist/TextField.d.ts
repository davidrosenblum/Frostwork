import { Object2D } from "./Object2D";
export declare class TextField extends Object2D {
    static defaultFont: string;
    static defaultStrokeColor: string;
    static defaultFillColor: string;
    private _text;
    private _font;
    private _fillColor;
    private _strokeColor;
    private _maxWidth;
    constructor(text?: string, x?: number, y?: number, font?: string, fillColor?: string, strokeColor?: string);
    draw(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void;
    text: string;
    font: string;
    strokeColor: string;
    fillColor: string;
    maxWidth: number;
}

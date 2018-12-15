import { EventEmitter } from "./EventEmitter";
import { Object2D } from "./Object2D";
export declare class Renderer extends EventEmitter {
    private _canvas;
    private _context;
    private _renderTarget;
    private _rendering;
    constructor(width?: number, height?: number);
    private clear;
    private renderFrame;
    startRendering(target: Object2D): void;
    stopRendering(): void;
    resize(width: number, height: number): void;
    injectInto(element: HTMLElement | string): void;
    download(format?: "jpg" | "png", filename?: string): void;
    readonly target: Object2D;
    readonly canvasWidth: number;
    readonly canvasHeight: number;
    readonly canvas: HTMLCanvasElement;
    readonly isRendering: boolean;
}

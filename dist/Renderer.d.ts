import { EventEmitter } from "./EventEmitter";
import { Scene } from "./Scene";
export declare class Renderer extends EventEmitter {
    private _canvas;
    private _context;
    private _rendering;
    constructor(width?: number, height?: number);
    private clear;
    private renderFrame;
    startRendering(scene: Scene): void;
    stopRendering(): void;
    resize(width: number, height: number): void;
    readonly canvasWidth: number;
    readonly canvasHeight: number;
    readonly canvas: HTMLCanvasElement;
    readonly isRendering: boolean;
}

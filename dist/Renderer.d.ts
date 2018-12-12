import { Scene } from "./Scene";
export declare class Renderer {
    private _canvas;
    private _context;
    constructor();
    render(scene: Scene): void;
    readonly canvas: HTMLCanvasElement;
}

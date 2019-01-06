import { Renderer } from "./Renderer";
import { Object2D, Bounds } from "./Object2D";
export declare class Scroller {
    private _renderer;
    private _bounds;
    private _scroll;
    constructor(renderer: Renderer, bounds: Bounds);
    private update;
    scrollXWith(target: Object2D, distance: number): void;
    scrollYWith(target: Object2D, distance: number): void;
    scrollX(distance: number): boolean;
    scrollY(distance: number): boolean;
    scrollXIgnoreBounds(distance: number): void;
    scrollYIgnoreBounds(distance: number): void;
    lookAt(target: Bounds): void;
    reset(): void;
}

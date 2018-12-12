import { EventEmitter } from "./EventEmitter";
import { Draw2D } from "./Interfaces";
export declare abstract class Object2D extends EventEmitter implements Draw2D {
    private static tokens;
    private _id;
    private _position;
    private _scene;
    visible: boolean;
    constructor(x?: number, y?: number);
    abstract draw(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number): void;
    protected drawChildren(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number): void;
    setPosition(x: number, y: number): void;
    x: number;
    y: number;
    readonly id: string;
}

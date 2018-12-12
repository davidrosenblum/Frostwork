import { Draw2D } from "./Interfaces";
import { Object2D } from "./Object2D";
export declare class Scene implements Draw2D {
    private _childIDs;
    private _drawList;
    constructor();
    draw(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void;
    addChild(child: Object2D): boolean;
    addChildAt(child: Object2D, index: number): boolean;
    addChildren(children: Object2D[]): void;
    removeChild(child: Object2D): Object2D;
    removeChildAt(index: number): Object2D;
    removeChildren(children?: Object2D[]): void;
    containsChild(target: Object2D): boolean;
    findChildIndex(target: Object2D): number;
    getChildById(id: string): Object2D;
    getChildAt(index: number): Object2D;
    readonly numChildren: number;
}

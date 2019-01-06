import { Draw2D } from "./DisplayObject";
import { Object2D } from "./Object2D";
export declare class Scene implements Draw2D {
    private _childIDs;
    private _drawList;
    private _wrappedObject;
    constructor(wrap?: Object2D);
    draw(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void;
    private markChildAsMine;
    addChild(child: Object2D): boolean;
    addChildAt(child: Object2D, index: number): boolean;
    addChildren(children: Object2D[]): void;
    removeChild(child: Object2D): Object2D;
    removeChildAt(index: number): Object2D;
    removeChildren(children?: Object2D[]): void;
    depthSort(): void;
    swapChildren(child1: Object2D, child2: Object2D): boolean;
    swapChildrenAt(index1: number, index2: number): boolean;
    containsChild(target: Object2D): boolean;
    findChildIndex(target: Object2D): number;
    forEachChild(fn: (child: Object2D, index?: number) => any): void;
    forAllChildren(fn: (child: Object2D) => any): void;
    getChildById(id: string): Object2D;
    getChildAt(index: number): Object2D;
    readonly numChildren: number;
}

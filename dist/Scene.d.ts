import { Draw2D, SortableDraw2D } from "./Interfaces";
export declare class Scene implements Draw2D {
    private _childIDs;
    private _drawList;
    constructor();
    draw(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void;
    addChild(child: SortableDraw2D): boolean;
    addChildAt(child: SortableDraw2D, index: number): boolean;
    addChildren(children: SortableDraw2D[]): void;
    removeChild(child: SortableDraw2D): SortableDraw2D;
    removeChildAt(index: number): SortableDraw2D;
    removeChildren(children?: SortableDraw2D[]): void;
    depthSort(): void;
    swapChildren(child1: SortableDraw2D, child2: SortableDraw2D): boolean;
    swapChildrenAt(index1: number, index2: number): boolean;
    containsChild(target: SortableDraw2D): boolean;
    findChildIndex(target: SortableDraw2D): number;
    forEachChild(fn: (child: SortableDraw2D, index?: number) => any): void;
    getChildById(id: string): SortableDraw2D;
    getChildAt(index: number): SortableDraw2D;
    readonly numChildren: number;
}

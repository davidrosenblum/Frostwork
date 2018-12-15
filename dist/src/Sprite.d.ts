import { SpriteConfig } from "./Interfaces";
import { Object2D } from "./Object2D";
export declare class Sprite extends Object2D {
    private static readonly EMPTY_IMAGE;
    static badImage: HTMLImageElement;
    private _image;
    constructor(image?: string, width?: number, height?: number, x?: number, y?: number);
    static create(config: SpriteConfig): Sprite;
    draw(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void;
    setImage(url: string): Promise<HTMLImageElement>;
    readonly imageElement: HTMLImageElement;
}

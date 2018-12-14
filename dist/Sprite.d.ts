import { CollisionObject, SpriteConfig, Size } from "./Interfaces";
import { Object2D } from "./Object2D";
export declare class Sprite extends Object2D implements CollisionObject {
    private static readonly EMPTY_IMAGE;
    static badImage: HTMLImageElement;
    private _image;
    private _collisionBounds;
    constructor(image?: string, width?: number, height?: number, x?: number, y?: number);
    static create(config: SpriteConfig): Sprite;
    draw(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void;
    hitBoxTest(target: Sprite): boolean;
    hitBoxTests(targets: Sprite[]): Sprite;
    collisionTest(target: Sprite): boolean;
    collisionTests(targets: Sprite[]): Sprite;
    setImage(url: string): Promise<HTMLImageElement>;
    setCustomCollisionBounds(width: number, height: number, depth?: number): void;
    useDefaultCollisionBounds(): void;
    readonly collisionBounds: Size;
    readonly imageElement: HTMLImageElement;
}

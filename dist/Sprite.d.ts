import { CollisionObject, SpriteConfig, Size } from "./Interfaces";
import { Object2D } from "./Object2D";
export declare class Sprite extends Object2D implements CollisionObject<Sprite> {
    private static readonly EMPTY_IMAGE;
    static badImage: HTMLImageElement;
    private _image;
    private _size;
    private _collisionBounds;
    constructor(image?: string, width?: number, height?: number, x?: number, y?: number);
    static create(config: SpriteConfig): Sprite;
    draw(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void;
    setImage(url: string): Promise<HTMLImageElement>;
    hitBoxTest(targets: Sprite[]): Sprite;
    collisionTest(targets: Sprite[]): Sprite;
    setSize(width: number, height: number, depth?: number): void;
    setCustomCollisionBounds(width: number, height: number, depth?: number): void;
    useDefaultCollisionBounds(): void;
    depth: number;
    readonly collisionBounds: Size;
    readonly centerX: number;
    readonly centerY: number;
    readonly right: number;
    readonly front: number;
    readonly bottom: number;
    readonly width: number;
    readonly height: number;
    readonly imageElement: HTMLImageElement;
}

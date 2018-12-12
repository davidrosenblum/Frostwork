import { EventEmitter } from "./EventEmitter";
import { Scene } from "./Scene";
import { Sprite } from "./Sprite";
export interface FWEvent {
    type: string;
    emitter: EventEmitter;
}
export interface Point {
    x: number;
    y: number;
}
export interface Size {
    width: number;
    height: number;
    depth: number;
}
export interface Draw2D {
    draw(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number): void;
}
export interface CollisionObject<T extends CollisionObject<T>> {
    hitBoxTest(target: T[]): T;
    collisionTest(target: T[]): T;
    collisionBounds: Size;
}
export interface SpriteConfig {
    image: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    depth?: number;
}
export interface MapConfig {
    tileLayout: number[][];
    tileTypes: (typeof Sprite)[];
    tileSize: number;
    scene: Scene;
    offsetX?: number;
    offsetY?: number;
}
export interface AnimationConfig {
    numFrames: number;
    clipWidth: number;
    clipHeight: number;
    marginX?: number;
    marginY?: number;
    offsetX?: number;
    offsetY?: number;
    axis: "x" | "y";
}
export interface AnimationFrameData {
    clipX: number;
    clipY: number;
    clipWidth: number;
    clipHeight: number;
}

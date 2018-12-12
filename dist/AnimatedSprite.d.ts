import { AnimationFrameData } from "./Interfaces";
import { Sprite } from "./Sprite";
export declare class AnimatedSprite extends Sprite {
    private _currAnim;
    private _currFrame;
    private _animations;
    private _animating;
    constructor(image?: string, width?: number, height?: number, x?: number, y?: number);
    draw(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void;
    nextFrame(): void;
    prevFrame(): void;
    playAnimation(animationName: string): void;
    stopAnimation(): void;
    setAnimation(animationName: string, frames: AnimationFrameData[]): void;
    hasAnimation(animationName: string): boolean;
    readonly currentFrameCount: number;
    readonly currentAnimation: string;
    readonly currentFrame: number;
    readonly isAnimating: boolean;
}

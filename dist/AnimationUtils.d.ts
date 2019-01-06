export interface AnimationFrameData {
    clipX: number;
    clipY: number;
    clipWidth: number;
    clipHeight: number;
    frameCount: number;
}
export interface AnimationConfig {
    numSrcFrames: number;
    numRepeatFrames?: number;
    clipWidth: number;
    clipHeight: number;
    marginX?: number;
    marginY?: number;
    offsetX?: number;
    offsetY?: number;
    axis: "x" | "y";
}
export declare class AnimationUtils {
    static createAnimation(config: AnimationConfig): AnimationFrameData[];
}

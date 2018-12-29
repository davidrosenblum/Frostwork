import { AnimationConfig, AnimationFrameData } from "./Interfaces";

export class AnimationUtils{
    public static createAnimation(config:AnimationConfig):AnimationFrameData[]{
        let { numSrcFrames, axis, clipWidth, clipHeight, offsetX=0, offsetY=0, marginX=0, marginY=0, numRepeatFrames=0 } = config;

        let clipX:number = offsetX;
        let clipY:number = offsetY;

        let frameCount:number = numRepeatFrames > 0 ? (numRepeatFrames / numSrcFrames) : 1;

        let frames:AnimationFrameData[] = new Array<AnimationFrameData>(numSrcFrames);
        for(let i:number = 0; i < numSrcFrames; i++){
            if(axis === "x"){
                clipX += i * (clipWidth + marginX);
            }
            else if(axis === "y"){
                clipY += i * (clipHeight + marginY);
            }

            frames[i] = { clipX, clipY, clipWidth, clipHeight, frameCount };
        }

        return frames;
    }
}
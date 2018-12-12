import { AnimationConfig, AnimationFrameData } from "./Interfaces";

export class AnimationUtils{
    public static createAnimation(config:AnimationConfig):AnimationFrameData[]{
        let { numFrames, axis, clipWidth, clipHeight, offsetX=0, offsetY=0, marginX=0, marginY=0 } = config;

        let clipX:number = offsetX;
        let clipY:number = offsetY;

        let frames:AnimationFrameData[] = new Array<AnimationFrameData>(numFrames);
        for(let i:number = 0; i < frames.length; i++){
            if(axis === "x"){
                clipX += i * (clipWidth + marginX);
            }
            else if(axis === "y"){
                clipY += i * (clipHeight + marginY);
            }

            frames[i] = { clipX, clipY, clipWidth, clipHeight };
        }

        return frames;
    }
}
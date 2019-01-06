import { AnimationFrameData } from "./AnimationUtils";
import { Sprite } from "./Sprite";

export class AnimatedSprite extends Sprite{
    private _currAnim:string;
    private _currFrame:number;
    private _animations:{[animation:string]: Array<AnimationFrameData>};
    private _animating:boolean;
    private _framesUntilUpdate:number;
    private _repeatsOfFrameLeft:number;

    constructor(image?:string, width?:number, height?:number, x?:number, y?:number){
        super(image, width, height, x, y);

        this._currAnim = null;
        this._currFrame = 0;
        this._animations = {};
        this._animating = false;
        this._framesUntilUpdate = 0;
        this._repeatsOfFrameLeft = 0;
    }

    public draw(ctx:CanvasRenderingContext2D, offsetX:number=0, offsetY:number=0):void{
        if(this.visible){
            if(this.isAnimating){
                this.emit("draw");
                
                let x:number = this.x + offsetX;
                let y:number = this.y + offsetY;

                let anim:AnimationFrameData = this.currentAnimationFrame;

                if(--this._repeatsOfFrameLeft <= 0){
                    if(--this._framesUntilUpdate <= 0){
                        this._framesUntilUpdate = this.currentFrameCount;
                        this.nextFrame();
                    }

                    anim = this.currentAnimationFrame;
                    this._repeatsOfFrameLeft = anim.frameCount;
                }
                
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.drawImage(
                    this.imageElement,
                    anim.clipX, anim.clipY, anim.clipWidth, anim.clipHeight,
                    x, y, this.width, this.height
                );
                ctx.restore();

                this.drawChildren(ctx, x, y);
            }
            else super.draw(ctx, offsetX, offsetY);
        }
    }

    public nextFrame():void{
        if(++this._currFrame >= this.currentFrameCount){
            this._currFrame = 0;
        }
    }

    public prevFrame():void{
        if(--this._currFrame < 0){
            let cfc:number = this.currentFrameCount;
            this._currFrame = cfc > 0 ? (cfc - 1) : 0;
        }
    }

    public playAnimation(animationName:string):void{
        if(this.hasAnimation(animationName) && animationName !== this.currentAnimation){
            this._currAnim = animationName;
            this.restartAnimation();
            this._animating = true;
        }
    }

    public stopAnimation():void{
        this._animating = false;
    }

    public restartAnimation():void{
        this._currFrame = 0;
        this._framesUntilUpdate = this.currentFrameCount;
        this._repeatsOfFrameLeft = this.currentAnimationFrame ? this.currentAnimationFrame.frameCount : 0;
    }

    public setAnimation(animationName:string, frames:AnimationFrameData[]):void{
        this._animations[animationName] = new Array<AnimationFrameData>(frames.length);
        frames.forEach((frame, i) => this._animations[animationName][i] = frame);

        if(this._currAnim == animationName){
            this.restartAnimation();
        }
    }

    public hasAnimation(animationName:string):boolean{
        return animationName in this._animations;
    }

    public get currentAnimationFrame():AnimationFrameData{
        return this._currAnim ? this._animations[this._currAnim][this._currFrame] : null;
    }

    public get currentFrameCount():number{
        return this._currAnim ? this._animations[this._currAnim].length : 0;
    }

    public get currentAnimation():string{
        return this._currAnim;
    }

    public get currentFrame():number{
        return this._currFrame;
    }

    public get isAnimating():boolean{
        return this._animating;
    }

    public toString(){
        return "[object AnimatedSprite]";
    }
}
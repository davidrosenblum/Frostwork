import { AnimationFrameData } from "./Interfaces";
import { Sprite } from "./Sprite";

export class AnimatedSprite extends Sprite{
    private _currAnim:string;
    private _currFrame:number;
    private _animations:{[animation:string]: Array<AnimationFrameData>};
    private _animating:boolean;

    constructor(image?:string, width?:number, height?:number, x?:number, y?:number){
        super(image, width, height, x, y);

        this._currAnim = null;
        this._currFrame = 0;
        this._animations = {};
        this._animating = false;
    }

    public draw(ctx:CanvasRenderingContext2D, offsetX:number=0, offsetY:number=0):void{
        if(this.visible){
            if(this.isAnimating){
                this.emit("draw");
                
                let x:number = this.x + offsetX;
                let y:number = this.y + offsetY;

                let anim:AnimationFrameData = this._animations[this._currAnim][this._currFrame];

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
            this.restartAnimation();
            this._animating = true;
        }
    }

    public stopAnimation():void{
        this._animating = false;
    }

    public restartAnimation():void{
        this._currFrame = 0;
    }

    public setAnimation(animationName:string, frames:AnimationFrameData[]):void{
        this._animations[animationName] = new Array<AnimationFrameData>(frames.length);
        frames.forEach((frame, i) => this._animations[animationName][i] = frame);

        if(this._currAnim = animationName){
            this.restartAnimation();
        }
    }

    public hasAnimation(animationName:string):boolean{
        return animationName in this._animations;
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
}
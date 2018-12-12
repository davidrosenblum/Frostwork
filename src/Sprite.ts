import { AssetUtils } from "./AssetUtils";
import { CollisionObject, SpriteConfig, Size } from "./Interfaces";
import { Object2D } from "./Object2D";

export class Sprite extends Object2D implements CollisionObject{
    private static readonly EMPTY_IMAGE:HTMLImageElement = document.createElement("img");

    public static badImage:HTMLImageElement = null;

    private _image:HTMLImageElement;
    private _size:Size;
    private _collisionBounds:Size;
    
    constructor(image?:string, width:number=0, height:number=0, x?:number, y?:number){
        super(x, y);

        this._image = Sprite.EMPTY_IMAGE;
        this._size = { width, height, depth: height - width };
        this._collisionBounds = null;

        if(image) this.setImage(image);
    }

    public static create(config:SpriteConfig):Sprite{
        let sprite:Sprite = new Sprite(config.image, config.width, config.height, config.x, config.y);

        if(config.depth){
            sprite.depth = config.depth;
        }

        return sprite;
    }

    public draw(ctx:CanvasRenderingContext2D, offsetX:number=0, offsetY:number=0):void{
        if(this.visible){
            this.emit("draw");

            let x:number = this.x + offsetX;
            let y:number = this.y + offsetY;

            ctx.drawImage(this._image, x, y, this.width, this.height);

            this.drawChildren(ctx, x, y);
        }
    }

    public async setImage(url:string):Promise<HTMLImageElement>{
        try{
            let img:HTMLImageElement = await AssetUtils.loadImage(url);
            this._image = img;
        }
        catch(err){
            this._image = Sprite.badImage || Sprite.EMPTY_IMAGE;
        }

        return this._image;
    }

     // uses actual bounding box
    public hitBoxTest(target:Sprite):boolean{
        if(this.x < target.right && target.x < this.right){
            if(this.y < target.bottom && target.y < this.bottom){
                return true;
            }
        }
        return false;
    }

    // uses actual bounding box
    public hitBoxTests(targets:Sprite[]):Sprite{
        for(let target of targets){
            if(this.hitBoxTest(target)){
                return target;
            }
        }
        return null;
    }

    // allows for custom bounding boxes 
    public collisionTest(target:Sprite):boolean{
        let bounds1:Size = this._collisionBounds;
        let bounds2:Size = target.collisionBounds;

        if(this.x < target.x + bounds2.width && target.x < this.x + bounds1.width){
            if(this.y < target.y + bounds2.height - bounds2.depth && target.y < this.y + bounds1.height - bounds1.depth){
                return true;
            }
        }
        return false;
    }

    // allows for custom bounding boxes 
    public collisionTests(targets:Sprite[]):Sprite{
        for(let target of targets){
            if(this.collisionTest(target)){
                return target;
            }
        }
        return null;
    }

    public setSize(width:number, height:number, depth?:number):void{
        this._size = { width, height, depth: depth || height - width }
    }


    public setCustomCollisionBounds(width:number, height:number, depth?:number):void{
        this._collisionBounds = { width, height, depth: depth || height - width };
    }

    public useDefaultCollisionBounds():void{
        this._collisionBounds = null;
    }

    public set depth(depth){
        this._size.depth = depth;
    }
    
    public get collisionBounds():Size{
        return this._collisionBounds || this._size;
    }

    public get centerX():number{
        return this.x + this.width / 2;
    }

    public get centerY():number{
        return this.y + this.height / 2;
    }

    public get right():number{
        return this.x + this.width;
    }

    public get front():number{
        return this.bottom - this.depth;
    }

    public get bottom():number{
        return this.y + this.height;
    }

    public get width():number{
        return this._size.width;
    }

    public get height():number{
        return this._size.height;
    }

    public get depth():number{
        return this._size.depth;
    }

    public get imageElement():HTMLImageElement{
        return this._image;
    }
}
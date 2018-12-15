import { AssetUtils } from "./AssetUtils";
import { SpriteConfig } from "./Interfaces";
import { Object2D } from "./Object2D";

export class Sprite extends Object2D{
    private static readonly EMPTY_IMAGE:HTMLImageElement = document.createElement("img");

    public static badImage:HTMLImageElement = null;

    private _image:HTMLImageElement;
    
    constructor(image?:string, width?:number, height?:number, x?:number, y?:number){
        super(width, height, x, y);

        this._image = Sprite.EMPTY_IMAGE;
        
        if(image) this.setImage(image);
    }

    public static create(config:SpriteConfig):Sprite{
        let sprite:Sprite = new Sprite(config.image, config.width, config.height, config.x, config.y);

        return sprite;
    }

    public draw(ctx:CanvasRenderingContext2D, offsetX:number=0, offsetY:number=0):void{
        if(this.visible){
            this.emit("draw");

            let x:number = this.x + offsetX;
            let y:number = this.y + offsetY;

            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.drawImage(this._image, x, y, this.width, this.height);
            ctx.restore();

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

    public get imageElement():HTMLImageElement{
        return this._image;
    }

    public toString(){
        return "[object Sprite]";
    }
}
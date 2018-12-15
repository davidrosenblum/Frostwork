import { EventEmitter } from "./EventEmitter";
import { Draw2D, Point, Size } from "./Interfaces";
import { TokenGenerator } from "./TokenGenerator";
import { BoundingBox } from "./BoundingBox";

export abstract class DisplayObject extends EventEmitter implements Draw2D, Point, Size{
    private static tokens:TokenGenerator = new TokenGenerator(16);

    private _id:string;
    private _bounds:BoundingBox;
    private _alpha:number;
    public visible:boolean;

    constructor(width:number=0, height:number=0, x:number=0, y:number=0){
        super();

        this._id = DisplayObject.tokens.nextToken();
        this._bounds = new BoundingBox(x, y, width, height);
        this._alpha = 1;
        this.visible = true;
    }

    public abstract draw(ctx:CanvasRenderingContext2D, offsetX:number, offsetY:number):void;

    public setPosition(x:number, y:number):void{
        this._bounds.x = x;
        this._bounds.y = y;
        this.emit("move");
    }

    public setSize(width:number, height:number):void{
        this._bounds.width = width;
        this._bounds.height = height;
        this.emit("resize");
    }

    public set x(x:number){
        this._bounds.x = x;
        this.emit("move");
    }

    public set y(y:number){
        this._bounds.y = y;
        this.emit("move");
    }

    public set width(width:number){
        this._bounds.width = width;
        this.emit("resize");
    }

    public set height(height:number){
        this._bounds.height = height;
        this.emit("resize");
    }

    public set alpha(alpha:number){
        this._alpha = Math.min(Math.max(alpha, 0), 1);
    }

    public get position():Point{
        return {
            x: this._bounds.x,
            y: this._bounds.y
        }
    }

    public get size():Size{
        return {
            width: this._bounds.width,
            height: this._bounds.height
        }
    }

    public get centerX():number{
        return this.x + this.width / 2;
    }

    public get centerY():number{
        return this.y + this.height / 2;
    }

    public get bottom():number{
        return this.y + this.height;
    }

    public get right():number{
        return this.x + this.width;
    }

    public get x():number{
        return this._bounds.x;
    }

    public get y():number{
        return this._bounds.y;
    }
    
    public get width():number{
        return this._bounds.width;
    }

    public get height():number{
        return this._bounds.height;
    }

    public get alpha():number{
        return this._alpha;
    }

    public get id():string{
        return this._id;
    }
}
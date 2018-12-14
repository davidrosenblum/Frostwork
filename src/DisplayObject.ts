import { EventEmitter } from "./EventEmitter";
import { Draw2D, Point, Size } from "./Interfaces";
import { TokenGenerator } from "./TokenGenerator";

export abstract class DisplayObject extends EventEmitter implements Draw2D{
    private static tokens:TokenGenerator = new TokenGenerator(16);

    private _id:string;
    private _position:Point;
    private _size:Size;
    private _alpha:number;
    public visible:boolean;


    constructor(width:number=0, height:number=0, x:number=0, y:number=0){
        super();

        this._id = DisplayObject.tokens.nextToken();
        this._position = { x, y };
        this._size = { width, height, depth: height - width };
        this._alpha = 1;
        this.visible = true;
    }

    public abstract draw(ctx:CanvasRenderingContext2D, offsetX:number, offsetY:number):void;

    public setPosition(x:number, y:number):void{
        this._position.x = x;
        this._position.y = y;
        this.emit("move");
    }

    public setSize(width:number, height:number, depth?:number):void{
        this._size = { width, height, depth: depth || height - width }
        this.emit("resize");
    }

    public set x(x:number){
        this._position.x = x;
        this.emit("move");
    }

    public set y(y:number){
        this._position.y = y;
        this.emit("move");
    }

    public set width(width:number){
        this._size.width = width;
        this.emit("resize");
    }

    public set height(height:number){
        this._size.height = height;
        this.emit("resize");
    }

    public set depth(depth:number){
        this._size.depth = depth;
        this.emit("resize");
    }

    public set alpha(alpha:number){
        this._alpha = Math.min(Math.max(alpha, 0), 1);
    }

    public get front():number{
        return this.bottom - this.depth;
    }

    public get bottom():number{
        return this.y + this.height;
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

    public get x():number{
        return this._position.x;
    }

    public get y():number{
        return this._position.y;
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

    public get alpha():number{
        return this._alpha;
    }

    public get id():string{
        return this._id;
    }
}
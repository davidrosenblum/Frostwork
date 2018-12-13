import { EventEmitter } from "./EventEmitter";
import { Draw2D, Point, Size } from "./Interfaces";
import { Scene } from "./Scene";
import { TokenGenerator } from "./TokenGenerator";

export abstract class Object2D extends EventEmitter implements Draw2D{
    private static tokens:TokenGenerator = new TokenGenerator(16);

    private _id:string;
    private _position:Point;
    private _size:Size;
    private _scene:Scene;
    private _parent:Object2D;

    public visible:boolean;

    constructor(width:number=0, height:number=0, x:number=0, y:number=0){
        super();

        this._id = Object2D.tokens.nextToken();
        this._position = { x, y };
        this._size = { width, height, depth: height - width };
        this._scene = new Scene();
        this._parent = null;

        this.visible = true;
    }
    
    public abstract draw(ctx:CanvasRenderingContext2D, offsetX:number, offsetY:number):void;

    protected drawChildren(ctx:CanvasRenderingContext2D, offsetX:number, offsetY:number):void{
        this._scene.draw(ctx, this.x + offsetX, this.y + offsetY);
    }

    protected setParent(parent:Object2D):void{
        this._parent = parent;
    }

    public setPosition(x:number, y:number):void{
        this._position.x = x;
        this._position.y = y;
        this.emit("move");
    }

    public setSize(width:number, height:number, depth?:number):void{
        this._size = { width, height, depth: depth || height - width }
    }

    public remove():void{
        if(this._parent){
            this._parent.scene.removeChild(this);
        }
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

    public get position():Point{
        return this._position;
    }

    public get size():Size{
        return this._size;
    }

    public get x():number{
        return this._position.x;
    }

    public get y():number{
        return this._position.y;
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

    public get scene():Scene{
        return this._scene;
    }

    public get id():string{
        return this._id;
    }

    public get parent():Object2D{
        return this._parent;
    }
}
import { EventEmitter } from "./EventEmitter";
import { Draw2D, Point } from "./Interfaces";
import { Scene } from "./Scene";
import { TokenGenerator } from "./TokenGenerator";

export abstract class Object2D extends EventEmitter implements Draw2D{
    private static tokens:TokenGenerator = new TokenGenerator(16);

    private _id:string;
    private _position:Point;
    private _scene:Scene;

    public visible:boolean;

    constructor(x:number=0, y:number=0){
        super();

        this._id = Object2D.tokens.nextToken();
        this._position = { x, y };
        this._scene = new Scene();
        
        this.visible = true;
    }
    
    public abstract draw(ctx:CanvasRenderingContext2D, offsetX:number, offsetY:number):void;

    protected drawChildren(ctx:CanvasRenderingContext2D, offsetX:number, offsetY:number):void{
        this._scene.draw(ctx, offsetX, offsetY);
    }

    public setPosition(x:number, y:number):void{
        this._position.x = x;
        this._position.y = y;
        this.emit("move");
    }

    public set x(x:number){
        this._position.x = x;
        this.emit("move");
    }

    public set y(y:number){
        this._position.y = y;
        this.emit("move");
    }

    public get x():number{
        return this._position.x;
    }

    public get y():number{
        return this._position.y;
    }

    public get id():string{
        return this._id;
    }
}
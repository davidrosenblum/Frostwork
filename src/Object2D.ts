import { BoundingBox } from "./BoundingBox";
import { DisplayObject } from "./DisplayObject";
import { Size, SortableDraw2D } from "./Interfaces";
import { Scene } from "./Scene";

export abstract class Object2D extends DisplayObject implements SortableDraw2D{
    private _collisionBounds:Size;
    private _scene:Scene;
    private _parent:Object2D;
    
    constructor(width?:number, height?:number, x?:number, y?:number){
        super(width, height, x, y);

        
        this._parent = null;

        this._collisionBounds = null;
    
        this._scene = new Scene(this);
    }

    protected drawChildren(ctx:CanvasRenderingContext2D, x:number, y:number):void{
        this._scene.draw(ctx, x, y);
    }

    public remove():void{
        if(this._parent){
            this._parent.scene.removeChild(this);
        }
    }

    // uses actual bounding box
    public hitBoxTest(target:Object2D):boolean{
        if(this.x < target.right && target.x < this.right){
            if(this.y < target.bottom && target.y < this.bottom){
                return true;
            }
        }
        return false;
    }

    // uses actual bounding box
    public hitBoxTests(targets:Object2D[]):Object2D{
        for(let target of targets){
            if(this.hitBoxTest(target)){
                return target;
            }
        }
        return null;
    }

    // allows for custom bounding boxes 
    public collisionTest(target:Object2D):boolean{
        let bounds1:Size = this.collisionBounds;
        let bounds2:Size = target.collisionBounds;

        if(this.x < target.x + bounds2.width && target.x < this.x + bounds1.width){
            if(this.y < target.y + bounds2.height - bounds2.depth && target.y < this.y + bounds1.height - bounds1.depth){
                return true;
            }
        }
        return false;
    }

    // allows for custom bounding boxes 
    public collisionTests(targets:Object2D[]):Object2D{
        for(let target of targets){
            if(this.collisionTest(target)){
                return target;
            }
        }
        return null;
    }

    public useDefaultCollisionBounds():void{
        this._collisionBounds = null;
    }

    public setCustomCollisionBounds(width:number, height:number, depth?:number):void{
        this._collisionBounds = { width, height, depth: depth || height - width };
    }

    public setParent(parent:Object2D):void{
        if(parent.scene.containsChild(this)){
            this._parent = parent;
        }
    }

    public getBoundingBox():BoundingBox{
        return new BoundingBox(this.x, this.y, this.width, this.height);
    }

    public get collisionBounds():Size{
        return this._collisionBounds || this.size;
    }

    public get scene():Scene{
        return this._scene;
    }

    public get parent():Object2D{
        return this._parent;
    }
}
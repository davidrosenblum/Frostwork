import { BoundingBox } from "./BoundingBox";
import { DisplayObject } from "./DisplayObject";
import { Size, SortableDraw2D, Point } from "./Interfaces";
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

    // allows for custom bounding boxes 
    public collisionTest(target:Object2D):boolean{
        let bounds1:BoundingBox = this.getCollisionBox();
        let bounds2:BoundingBox = target.getCollisionBox();

        return bounds1.hitBoxTest(bounds2);
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

    public setCustomCollisionBounds(width:number, height:number):void{
        this._collisionBounds = { width, height };
    }

    public setParent(parent:Object2D):void{
        if(parent){
            if(parent.scene.containsChild(this)){
                this._parent = parent;
            }
        }
        else{
            this._parent = null;
        }
    }

    public getBoundingBox():BoundingBox{
        return new BoundingBox(this.x, this.y, this.width, this.height);
    }

    public getCollisionBox():BoundingBox{
        if(this._collisionBounds){
            // centers
            let x:number = this.x - (this._collisionBounds.width - this.width) / 2;
            let y:number = this.bottom - this._collisionBounds.height;

            return new BoundingBox(x, y, this._collisionBounds.width, this._collisionBounds.height);
        }
        return this.getBoundingBox();
    }

    public getCoords(tileSize:number, offsetX:number=0, offsetY:number=0):Point{
        let cb:BoundingBox = this.getCollisionBox();
        return {
            x: Math.floor((cb.centerX + offsetX) / tileSize),
            y: Math.floor((cb.centerY + offsetY) / tileSize)
        };
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
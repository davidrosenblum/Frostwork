import { BoundingBox } from "./BoundingBox";
import { Bounds } from "./Interfaces";
import { Renderer } from "./Renderer";
import { Object2D } from "./Object2D";

export class Scroller{
    private _renderer:Renderer;
    private _bounds:BoundingBox;
    private _scroll:BoundingBox;
    
    constructor(renderer:Renderer, bounds:Bounds){
        this._bounds = new BoundingBox(bounds.x, bounds.y, bounds.width, bounds.height);
        this._scroll = new BoundingBox(0, 0, renderer.canvasWidth, renderer.canvasHeight);
        this._renderer = renderer;
    }

    private update():void{
        this._renderer.target.x = -this._scroll.x;
        this._renderer.target.y = -this._scroll.y;
    }

    public scrollXWith(target:Object2D, distance:number):void{
        if(distance < 0){
            // right
            if(target.centerX < this._scroll.centerX){
                this.scrollX(distance);
            }
        }
        else{
            // left
            if(target.centerX > this._scroll.centerX){
                this.scrollX(distance);
            }
        }
    }

    public scrollYWith(target:Object2D, distance:number):void{
        if(distance < 0){
            // down
            if(target.centerY < this._scroll.centerY){
                this.scrollY(distance);
            }
        }
        else{
            // up
            if(target.centerY > this._scroll.centerY){
                this.scrollY(distance);
            }
        }
    }

    public scrollX(distance:number):boolean{
        let offset:number = this._scroll.x + distance;
        if(offset >= this._bounds.x && offset + this._scroll.width <= this._bounds.right){
            this._scroll.x = offset;
            this.update();
            return true;
        }
        return false;
    }

    public scrollY(distance:number):boolean{
        let offset:number = this._scroll.y + distance;
        if(offset >= this._bounds.y && offset + this._scroll.height <= this._bounds.bottom){
            this._scroll.y = offset;
            this.update();
            return true;
        }
        return false;
    }

    public scrollXIgnoreBounds(distance:number):void{
        this._scroll.x += distance;
        this.update();
    }

    public scrollYIgnoreBounds(distance:number):void{
        this._scroll.y += distance;
        this.update();
    }

    public lookAt(target:Bounds):void{

    }

    public reset():void{
        this.scrollXIgnoreBounds(-this._scroll.x);
        this.scrollYIgnoreBounds(-this._scroll.y);
    }
}
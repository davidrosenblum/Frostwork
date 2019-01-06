import { Bounds } from "./Object2D";
import { Point } from "./DisplayObject";

export class BoundingBox implements Bounds, Point{
    public x:number;
    public y:number;
    public width:number;
    public height:number;

    constructor(x:number=0, y:number=0, width:number=0, height:number=0){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public hitBoxTest(target:BoundingBox):boolean{
        if(target.x < this.right && this.x < target.right){
            if(target.y < this.bottom && this.y < target.bottom){
                return true;
            }
        }
        return false;
    }

    public hitBoxTests(targets:BoundingBox[]):BoundingBox{
        for(let target of targets){
            if(this.hitBoxTest(target)){
                return target;
            }
        }
        return null;
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

    public get bottom():number{
        return this.y + this.height;
    }
}
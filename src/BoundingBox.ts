import { Bounds } from "./Interfaces";

export class BoundingBox implements Bounds{
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
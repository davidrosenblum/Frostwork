import { AnimatedSprite } from "./AnimatedSprite";
import { CollisionGrid } from "./CollisionGrid";
import { GameEntityFacing } from "./Enums";
import { CollisionObject, Bounds } from "./Interfaces";
import { Scroller } from "./Scroller";
import { Sprite } from "./Sprite";

export class GameEntity extends AnimatedSprite{
    private _moveSpeed:number;
    private _facing:GameEntityFacing;
    public canMove:boolean;

    constructor(image?:string, width?:number, height?:number, x?:number, y?:number){
        super(image, width, height, x, y);

        this._moveSpeed = 1;
        this._facing = GameEntityFacing.RIGHT;
        this.canMove = true;
    }

    public move(grid?:CollisionGrid<Sprite>, bounds?:Bounds, scroller?:Scroller):void{
        if(this.canMove){
            switch(this.facing){
                case GameEntityFacing.UP:
                    this.moveLeft(grid, bounds, scroller);
                    break;
                case GameEntityFacing.DOWN:
                    this.moveLeft(grid, bounds, scroller);
                    break;
                case GameEntityFacing.LEFT:
                    this.moveLeft(grid, bounds, scroller);
                    break;
                case GameEntityFacing.RIGHT:
                    this.moveLeft(grid, bounds, scroller);
                    break;
            }
        }
    }

    public moveLeft(grid:CollisionGrid<Sprite>, bounds?:Bounds, scroller?:Scroller):Sprite{
        let x:number = this.x - this.moveSpeed;

        if(grid){
            let hit:Sprite = grid.getObjectAtPixels(this.x, this.y);
            if(hit && this.collisionTest(hit)){
                return hit;
            }
        }

        if(bounds && x < bounds.x){
            x = bounds.x;
        }

        if(scroller){
            // scroll left by this.x - x pixels 
        }

        this.x = x;
        return null;
    }

    public set moveSpeed(moveSpeed:number){
        this._moveSpeed = Math.abs(moveSpeed);
    }

    public set facing(facing:GameEntityFacing){
        this._facing = facing;
        this.restartAnimation();
    }

    public get moveSpeed():number{
        return this._moveSpeed;
    }

    public get facing():GameEntityFacing{
        return this._facing;
    }
}
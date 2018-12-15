import { AnimatedSprite } from "./AnimatedSprite";
import { BoundingBox } from "./BoundingBox";
import { CollisionGrid } from "./CollisionGrid";
import { GameEntityFacing } from "./Enums";
import { Bounds } from "./Interfaces";
import { Scroller } from "./Scroller";
import { Sprite } from "./Sprite";
import { TextField } from "./TextField";

export class GameEntity extends AnimatedSprite{
    private _moveSpeed:number;
    private _facing:GameEntityFacing;
    private _nametag:TextField;
    public canMove:boolean;

    constructor(image?:string, width?:number, height?:number, x?:number, y?:number){
        super(image, width, height, x, y);

        this._moveSpeed = 1;
        this._facing = GameEntityFacing.RIGHT;
        this.canMove = true;
    }

    private getHit(grid?:CollisionGrid<Sprite>):Sprite{
        if(grid){
            let hit:Sprite = grid.getObjectAtPixels(this.x, this.y);
            return this.collisionTest(hit) ? hit : null;
        }
        return null;
    }

    public setNametag(name?:string, font?:string, fillStyle?:string, strokeStyle?:string):void{
        if(this._nametag){
            this._nametag.remove();
        }

        if(name){
            this._nametag = new TextField(name, 0, 0, font, fillStyle, strokeStyle);
            this.scene.addChild(this._nametag);

            this._nametag.centerText();
            this._nametag.y -= this._nametag.height;
        }
    }

    public move(grid?:CollisionGrid<Sprite>, bounds?:Bounds, scroller?:Scroller):void{
        if(this.canMove){
            switch(this.facing){
                case GameEntityFacing.UP:
                    this.moveLeft(grid, bounds, scroller);
                    break;
                case GameEntityFacing.DOWN:
                    this.moveDown(grid, bounds, scroller);
                    break;
                case GameEntityFacing.LEFT:
                    this.moveLeft(grid, bounds, scroller);
                    break;
                case GameEntityFacing.RIGHT:
                    this.moveRight(grid, bounds, scroller);
                    break;
            }
        }
    }

    public moveUp(grid:CollisionGrid<Sprite>, bounds?:Bounds, scroller?:Scroller):Sprite{
        if(!this.canMove) return null;

        let y:number = this.y - this.moveSpeed;

        if(grid){
            let hit:Sprite = grid.getObjectAtTarget(this);
            if(hit && this.collisionTest(hit)){
                return hit;
            }
        }

        if(bounds && y < bounds.y){
            y = bounds.y;
        }

        if(scroller){
            // scroll left by this.x - x pixels 
        }

        this.y = y;
        this.facing = GameEntityFacing.UP;
        
        return null;
    }

    public moveDown(grid:CollisionGrid<Sprite>, bounds?:Bounds, scroller?:Scroller):Sprite{
        if(!this.canMove) return null;

        let y:number = this.y + this.moveSpeed;

        if(grid){
            let hit:Sprite = grid.getObjectAtTarget(this);
            if(hit && this.collisionTest(hit)){
                return hit;
            }
        }

        if(bounds){
            let boundsBottom:number = bounds.y + bounds.height;
            if(y + this.height > boundsBottom){
                y = boundsBottom - this.height;
            }
        }

        if(scroller){
            // scroll left by this.x - x pixels 
        }

        this.y = y;
        this.facing = GameEntityFacing.DOWN;

        return null;
    }

    public moveLeft(grid:CollisionGrid<Sprite>, bounds?:Bounds, scroller?:Scroller):Sprite{
        if(!this.canMove) return null;

        let x:number = this.x - this.moveSpeed;

        if(grid){
            let hit:Sprite = grid.getObjectAtTarget(this);
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
        this.facing = GameEntityFacing.LEFT;

        return null;
    }

    public moveRight(grid:CollisionGrid<Sprite>, bounds?:Bounds, scroller?:Scroller):Sprite{
        if(!this.canMove) return null;

        let x:number = this.x + this.moveSpeed;

        if(grid){
            let hit:Sprite = grid.getObjectAtTarget(this);
            if(hit && this.collisionTest(hit)){
                return hit;
            }
        }

        if(bounds){
            let boundsRight:number = bounds.x + bounds.width;
            if(x + this.width > boundsRight){
                x = boundsRight - this.width;
            }
        }

        if(scroller){
            // scroll right
        }

        this.x = x;
        this.facing = GameEntityFacing.RIGHT;

        return null;
    }

    public set moveSpeed(moveSpeed:number){
        this._moveSpeed = Math.abs(moveSpeed);
    }

    public set facing(facing:GameEntityFacing){
        let oldFacing:string = this._facing;

        this._facing = facing;
        this.restartAnimation();

        if(oldFacing !== facing){
            this.emit("facing");
        }
    }

    public get moveSpeed():number{
        return this._moveSpeed;
    }

    public get facing():GameEntityFacing{
        return this._facing;
    }

    public toString(){
        return "[object GameEntity]";
    }
}
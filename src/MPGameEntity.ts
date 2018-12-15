import { GameEntity } from "./GameEntity";
import { GameEntityData } from "./Interfaces";

export class MPGameEntity extends GameEntity{
    private _objectID:string;
    private _teamID:string;

    constructor(image?:string, width?:number, height?:number, x?:number, y?:number, objectID:string=null, teamID:string=null){
        super(image, width, height, x, y);

        this._objectID = objectID;
        this._teamID = teamID;
    }

    public applyUpdate(update:GameEntityData):void{
        if(update.x){
            this.x = update.x;
        }

        if(update.y){
            this.y = update.y
        }

        if(update.facing){
            this.facing = update.facing;
        }

        if(update.anim){
            this.playAnimation(update.anim);
        }

        if(update.moveSpeed){
            this.moveSpeed = update.moveSpeed;
        }
    }

    public getData():GameEntityData{
        return {
            x:          this.x,
            y:          this.y,
            anim:       this.currentAnimation,
            facing:     this.facing,
            moveSpeed:  this.moveSpeed,
            objectID:   this.objectID,
            teamID:     this.teamID
        }
    }

    public get objectID():string{
        return this._objectID;
    }

    public get teamID():string{
        return this._teamID;
    }

    public toString(){
        return "[object MPGameEntity]";
    }
}
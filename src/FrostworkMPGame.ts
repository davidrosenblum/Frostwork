import { FrostworkGame } from "./FrostworkGame";
import { GameLayer } from "./Enums";
import { GameEntityData, SortableDraw2D } from "./Interfaces";
import { MPGameEntity } from "./MPGameEntity";

export class FrostworkMPGame extends FrostworkGame{
    private _multiplayerObjects:GameObjectsHelper;
    private _player1:MPGameEntity;

    constructor(width?:number, height?:number){
        super(width, height);

        this._multiplayerObjects = new GameObjectsHelper();
    }

    public stop():void{
        this._multiplayerObjects.clear();
        super.stop();
    }

    public add(object:SortableDraw2D, layer:GameLayer=GameLayer.MIDGROUND):boolean{
        if(object instanceof MPGameEntity){
            if(!this._multiplayerObjects.addObject(object)){
                throw new Error("MP_ENTITY_ADD_ERROR: Multiplayer object already in the game.");
            }
        }
        
        return super.add(object, layer);
    }

    public remove(target:SortableDraw2D, layer:GameLayer=GameLayer.MIDGROUND):boolean{
        if(target instanceof MPGameEntity){
            if(this._multiplayerObjects.removeObject(target)){
                return super.remove(target, layer);
            }
            return false;
        }
    }

    public updateObject(data:GameEntityData):boolean{
        return this._multiplayerObjects.updateObject(data);
    }
}

class GameObjectsHelper{
    public objects:{[id:string]: MPGameEntity};

    constructor(){
        this.objects = null;
    }

    public addObject(object:MPGameEntity):boolean{
        if(this.containsObject(object)){
            this.objects[object.objectID] = object;
            return true;
        }
        return false;
    }

    public removeObject(object:MPGameEntity):boolean{
        return delete this.objects[object.objectID];
    }

    public updateObject(data:GameEntityData):boolean{
        let object:MPGameEntity = this.getObject(data.objectID);
        if(object){
            object.applyUpdate(data);
            return true;
        }
        return false;
    }

    public clear():void{
        this.objects = {};
    }

    public containsObject(object:MPGameEntity|string):boolean{
        if(typeof object === "string"){
            return object in this.objects;
        }
        return object.objectID in this.objects;
    }

    public getObject(objectID:string):MPGameEntity{
        return this.objects[objectID] || null;;
    }
}
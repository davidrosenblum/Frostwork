import { MPGameEntity, GameEntityData } from "./MPGameEntity";

export class MPEntityStorage{
    private _objects:{[id:string]: MPGameEntity};
    private _numObjects:number;

    constructor(){
        this._objects = {};
        this._numObjects = 0;
    }

    public addObject(object:MPGameEntity):boolean{
        if(!this.containsObject(object)){
            this._objects[object.objectID] = object;
            this._numObjects++;
            return true;
        }
        return false;
    }

    public removeObject(object:MPGameEntity):boolean{
        return this.removeObjectById(object.objectID);
    }

    public removeObjectById(id:string):boolean{
        if(delete this._objects[id]){
            this._numObjects--;
            return true;
        }
        return false;
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
        this._objects = {};
    }

    public containsObject(object:MPGameEntity|string):boolean{
        if(typeof object === "string"){
            return object in this._objects;
        }
        return object.objectID in this._objects;
    }

    public getObject(objectID:string):MPGameEntity{
        return this._objects[objectID] || null;;
    }

    public get numObjects():number{
        return this._numObjects;
    }
}
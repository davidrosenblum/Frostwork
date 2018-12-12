import { Draw2D } from "./Interfaces";
import { Object2D } from "./Object2D";

export class Scene implements Draw2D{
    private _childIDs:{[id:string]:Object2D};
    private _drawList:Object2D[];

    constructor(){
        this._childIDs = {};
        this._drawList = [];
    }

    public draw(ctx:CanvasRenderingContext2D, offsetX:number=0, offsetY:number=0):void{
        this._drawList.forEach(child => child.draw(ctx, offsetX, offsetY));
    }

    public addChild(child:Object2D):boolean{
        if(!this.containsChild(child)){
            this._childIDs[child.id] = child;
            this._drawList.push(child);

            return true;
        }
        return false;
    }

    public addChildAt(child:Object2D, index:number):boolean{
        if(!this.containsChild(child)){
            let updatedDrawList:Object2D[] = [];

            this._drawList.forEach((currChild, currIndex) => {
                if(index === currIndex){
                    updatedDrawList.push(child);
                }
                else{
                    updatedDrawList.push(currChild);
                }
            });

            this._drawList = updatedDrawList;

            return true;
        }
        return false;
    }

    public addChildren(children:Object2D[]):void{
        children.forEach(child => this.addChild(child));
    }

    public removeChild(child:Object2D):Object2D{
        return this.removeChildAt(this.findChildIndex(child));
    }

    public removeChildAt(index:number):Object2D{
        if(index in this._drawList){
            let child:Object2D = this.getChildAt(index);

            delete this._childIDs[child.id];
            this._drawList.splice(index, 1);

            return child;
        }
    }

    public removeChildren(children?:Object2D[]):void{
        if(children){
            children.forEach(child => this.removeChild(child));
        }
        else{
            while(this.numChildren > 0){
                this.removeChildAt(this.numChildren - 1);
            }
        }
    }

    public containsChild(target:Object2D):boolean{
        return target.id in this._childIDs;
    }

    public findChildIndex(target:Object2D):number{
        this._drawList.forEach((child, index) => {
            if(child === target){
                return index;
            }
        });

        return -1;
    }

    public getChildById(id:string):Object2D{
        return this._childIDs[id] || null;
    }

    public getChildAt(index:number):Object2D{
        return this._drawList[index] || null;
    }

    public get numChildren():number{
        return this._drawList.length;
    }
}
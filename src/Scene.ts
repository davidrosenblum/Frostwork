import { Draw2D, SortableDraw2D } from "./Interfaces";

export class Scene implements Draw2D{
    private _childIDs:{[id:string]:SortableDraw2D};
    private _drawList:SortableDraw2D[];

    constructor(){
        this._childIDs = {};
        this._drawList = [];
    }

    public draw(ctx:CanvasRenderingContext2D, offsetX:number=0, offsetY:number=0):void{
        this._drawList.forEach(child => child.draw(ctx, offsetX, offsetY));
    }

    public addChild(child:SortableDraw2D):boolean{
        if(!this.containsChild(child)){
            this._childIDs[child.id] = child;
            this._drawList.push(child);

            return true;
        }
        return false;
    }

    public addChildAt(child:SortableDraw2D, index:number):boolean{
        if(!this.containsChild(child)){
            let updatedDrawList:SortableDraw2D[] = [];

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

    public addChildren(children:SortableDraw2D[]):void{
        children.forEach(child => this.addChild(child));
    }

    public removeChild(child:SortableDraw2D):SortableDraw2D{
        return this.removeChildAt(this.findChildIndex(child));
    }

    public removeChildAt(index:number):SortableDraw2D{
        if(index in this._drawList){
            let child:SortableDraw2D = this.getChildAt(index);

            delete this._childIDs[child.id];
            this._drawList.splice(index, 1);

            return child;
        }
    }

    public removeChildren(children?:SortableDraw2D[]):void{
        if(children){
            children.forEach(child => this.removeChild(child));
        }
        else{
            while(this.numChildren > 0){
                this.removeChildAt(this.numChildren - 1);
            }
        }
    }

    public depthSort():void{
        let a:SortableDraw2D = null;
        let b:SortableDraw2D = null;

        for(let i:number = 0; i < this.numChildren; i++){
            a = this.getChildAt(i);

            for(let j:number = i + 1; j < this.numChildren; j++){
                b = this.getChildAt(j);

                if(a.bottom < b.bottom){
                    this._drawList[i] = b;
                    this._drawList[j] = a;

                    a = b;
                }
            }
        }
    }

    public swapChildren(child1:SortableDraw2D, child2:SortableDraw2D):boolean{
        let index1:number = -1;
        let index2:number = -1;

        this._drawList.forEach((child, index) => {
            if(child === child1){
                index1 === index;
            }
            else if(child === child2){
                index2 === index;
            }

            if(index1 > -1 && index2 > -1){
                return this.swapChildrenAt(index1, index2);
            }
        });

        return false;
    }

    public swapChildrenAt(index1:number, index2:number):boolean{
        let a:SortableDraw2D = this.getChildAt(index1);
        let b:SortableDraw2D = this.getChildAt(index2);

        if(a && b){
            this._drawList[index1] = b;
            this._drawList[index2] = a;

            return true;
        }
        return false;
    }

    public containsChild(target:SortableDraw2D):boolean{
        return target.id in this._childIDs;
    }

    public findChildIndex(target:SortableDraw2D):number{
        this._drawList.forEach((child, index) => {
            if(child === target){
                return index;
            }
        });

        return -1;
    }

    public getChildById(id:string):SortableDraw2D{
        return this._childIDs[id] || null;
    }

    public getChildAt(index:number):SortableDraw2D{
        return this._drawList[index] || null;
    }

    public get numChildren():number{
        return this._drawList.length;
    }
}
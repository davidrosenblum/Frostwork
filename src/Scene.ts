import { Draw2D } from "./DisplayObject";
import { Object2D } from "./Object2D";

export class Scene implements Draw2D{
    private _childIDs:{[id:string]:Object2D};
    private _drawList:Object2D[];
    private _wrappedObject:Object2D;

    constructor(wrap:Object2D=null){
        this._childIDs = {};
        this._drawList = [];
        this._wrappedObject = wrap;
    }

    public draw(ctx:CanvasRenderingContext2D, offsetX:number=0, offsetY:number=0):void{
        this._drawList.forEach(child => child.draw(ctx, offsetX, offsetY));
    }

    private markChildAsMine(child:Object2D):void{
        this._childIDs[child.id] = child;
        this._drawList.push(child);

        child.setParent(this._wrappedObject);
    }

    public addChild(child:Object2D):boolean{
        if(!this.containsChild(child)){
            this.markChildAsMine(child);

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

            this.markChildAsMine(child);

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

            child.setParent(null);

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

    public depthSort():void{
        let a:Object2D = null;
        let b:Object2D = null;

        for(let i:number = 0; i < this.numChildren; i++){
            a = this.getChildAt(i);

            for(let j:number = i + 1; j < this.numChildren; j++){
                b = this.getChildAt(j);

                if(a.bottom > b.bottom){
                    this._drawList[i] = b;
                    this._drawList[j] = a;

                    a = b;
                }
            }
        }
    }

    public swapChildren(child1:Object2D, child2:Object2D):boolean{
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
        let a:Object2D = this.getChildAt(index1);
        let b:Object2D = this.getChildAt(index2);

        if(a && b){
            this._drawList[index1] = b;
            this._drawList[index2] = a;

            return true;
        }
        return false;
    }

    public containsChild(target:Object2D):boolean{
        return target.id in this._childIDs;
    }

    public findChildIndex(target:Object2D):number{
        for(let i:number = 0; i < this.numChildren; i++){
            if(this.getChildAt(i) === target){
                return i;
            }
        }

        return -1;
    }

    public forEachChild(fn:(child:Object2D, index?:number)=>any):void{
        let i:number = 0;
        for(let object of this._drawList){
            fn(object, i++);
        }
    }

    public forAllChildren(fn:(child:Object2D)=>any):void{
        this.forEachChild(child => {
            fn(child);

            if(child.scene){
                child.scene.forEachChild(fn);
            }
        });
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
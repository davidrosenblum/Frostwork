export class KeyboardWatcher{
    private _keys:{[key:string]: boolean};
    private _numKeys:number;
    
    constructor(element?:HTMLElement){
        this._keys = {};
        this._numKeys = 0;

        element.addEventListener("keyup", this.handleKeyUp.bind(this));
        element.addEventListener("keydown", this.handleKeyDown.bind(this));
    }

    private handleKeyUp(evt:KeyboardEvent):void{
        this.forceKeyUp(evt.key);
    }

    private handleKeyDown(evt:KeyboardEvent):void{
        this.forceKeyDown(evt.key);
    }

    public forceKeyUp(key:string):void{
        if(this.isKeyDown(key)){
            delete this._keys[key];
            this._numKeys--;
        }
    }

    public forceKeyDown(key:string):void{
        if(this.isKeyUp(key)){
            this._keys[key] = true;
            this._numKeys++;
        }
    }

    public isKeyUp(key:string):boolean{
        return key in this._keys === false;
    }

    public isKeyDown(key:string):boolean{
        return key in this._keys;
    }

    public anyKeysUp(keys:string[]):boolean{
        for(let key of keys){
            if(this.isKeyUp(key)){
                return true;
            }
        }
        return false;
    }

    public anyKeysDown(keys:string[]):boolean{
        for(let key of keys){
            if(this.isKeyDown(key)){
                return true;
            }
        }
        return false;
    }

    public allKeysUp(keys:string[]):boolean{
        return !this.anyKeysDown(keys);
    }

    public allKeysDown(keys:string[]):boolean{
        return !this.anyKeysUp(keys);
    }

    public get numKeys():number{
        return this._numKeys;
    }
}
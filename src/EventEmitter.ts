import { FWEvent } from "./Interfaces";

export class EventEmitter{
    private _eventListeners:{[type:string]: Array<(evt:FWEvent)=>any>};

    constructor(){
        this._eventListeners = {};
    }

    public emit(eventType:string|FWEvent):boolean{
        let event:FWEvent = typeof eventType === "string" ? {
            type: eventType,
            emitter: this
        } : (eventType as FWEvent);

        event.emitter = this;

        if(this.willTrigger(event.type)){
            this._eventListeners[event.type].forEach(listener => listener(event));
            return true;
        }
        return false;
    }

    public on(eventType:string, listener:(evt:FWEvent)=>any):void{
        if(this.willTrigger(eventType)){
            this._eventListeners[eventType].push(listener);
        }
        else{
            this._eventListeners[eventType] = [listener];
        }
    }

    public off(eventType:string, listener:(evt:FWEvent)=>any):boolean{
        if(this.willTrigger(eventType)){
            let listeners:Array<(evt:FWEvent)=>any> = this._eventListeners[eventType];

            for(let i:number = 0; i < listeners.length; i++){
                if(listeners[i] === listener){
                    listeners.splice(i, 1);
                    return true;
                }
            }
        }
        return false;
    }

    public removeListeners(eventType:string):boolean{
        return delete this._eventListeners[eventType];
    }

    public removeAllListeners():void{
        this._eventListeners = {};
    }

    public willTrigger(eventType:string):boolean{
        return eventType in this._eventListeners;
    }
}
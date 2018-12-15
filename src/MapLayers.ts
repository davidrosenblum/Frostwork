import { BoundingBox } from "./BoundingBox";
import { CollisionGrid } from "./CollisionGrid";
import { GameLayer } from "./Enums";
import { InvalidLayerError } from "./Errors";
import { SortableDraw2D, LayeredMapConfig, GeneratedMapData } from "./Interfaces";
import { MapUtils } from "./MapUtils";
import { Scene } from "./Scene";
import { Sprite } from "./Sprite";

export class MapLayers{
    private _container:Sprite;
    private _layers:{[layer:number]: Sprite};

    constructor(){
        this._container = new Sprite();
        
        this._layers = {};
        this._layers[GameLayer.BACKGROUND] = new Sprite();
        this._layers[GameLayer.MIDGROUND] = new Sprite();
        this._layers[GameLayer.FOREGROUND] = new Sprite();
        this._layers[GameLayer.HUD] = new Sprite();

        for(let layer in this._layers){
            this._container.scene.addChild(this._layers[layer]);
        }
    }

    public buildMap(config:LayeredMapConfig):GeneratedMapData{
        return MapUtils.buildLayerMap(
            config,
            this._layers[GameLayer.BACKGROUND].scene,
            this._layers[GameLayer.MIDGROUND].scene,
            this._layers[GameLayer.FOREGROUND].scene
        );
    }

    public add(object:SortableDraw2D, layer:GameLayer=GameLayer.MIDGROUND):boolean{
        if(layer in this._layers){
            return this._layers[layer].scene.addChild(object);
        }
        else throw new InvalidLayerError();
    }

    public remove(object:SortableDraw2D, layer:GameLayer=GameLayer.MIDGROUND):boolean{
        if(layer in this._layers){
            return this._layers[layer].scene.removeChild(object) !== null;
        }
        else throw new InvalidLayerError();
    }

    public removeAll():void{
        this.forEachScene(scene => scene.removeChildren());
    }

    private forEachScene(fn:(scene:Scene)=>any):void{
        for(let layer in this._layers){
            fn(this._layers[layer].scene);
        }
    }

    public depthSort():void{
        this._layers[GameLayer.MIDGROUND].scene.depthSort();
    }

    public countChildren():number{
        let num:number = 0;
        this.forEachScene(scene => num += scene.numChildren);
        return num;
    }

    public get scene():Scene{
        return this._container.scene;
    }
}
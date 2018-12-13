import { CollisionGrid } from "./CollisionGrid";
import { GameLayer } from "./Enums";
import { EventEmitter } from "./EventEmitter";
import { MapUtils } from "./MapUtils";
import { MPGameEntity } from "./MPGameEntity";
import { SortableDraw2D, GameEntityData, GameMapConfig, GameMapLayerConfig, MapConfig } from "./Interfaces";
import { Renderer } from "./Renderer";
import { Sprite } from "./Sprite";

export class Game extends EventEmitter{
    private _renderer:Renderer;
    private _multiplayerObjects:GameObjectsHelper;
    private _layers:GameLayersHelper;
    private _collisionGrid:CollisionGrid<Sprite>;
    private _started:boolean;

    constructor(width?:number, height?:number){
        super();

        this._renderer = new Renderer(width, height);
        this._multiplayerObjects = new GameObjectsHelper();
        this._layers = new GameLayersHelper();
        this._collisionGrid = null;
        this._started = false;
    }

    public start():void{
        if(!this.alreadyStarted){
            this._layers.createLayers();
            this._renderer.startRendering(this._layers.container.scene);
            this._started = true;
        }
    }

    public togglePause():void{
        if(this.alreadyStarted){
            if(this._renderer.isRendering){
                this._renderer.stopRendering();
            }
            else{
                this._renderer.startRendering(this._layers.container.scene);
            }
        }
    }

    public stop():void{
        if(this.alreadyStarted){
            this._started = false;
            this._layers.destroyLayers();
            this._renderer.stopRendering();
            this._multiplayerObjects.clear();
        }
    }

    public add(object:SortableDraw2D, layer:GameLayer=GameLayer.MIDGROUND):boolean{
        // game must be initialized
        if(this.alreadyStarted){
            // layer must exist
            if(layer in this._layers){
                // if the object is multiplayer - make sure its not a dupe
                if(object instanceof MPGameEntity){
                    // dupe - error
                    if(!this._multiplayerObjects.addObject(object)){
                        throw new Error("MP_ENTITY_ADD_ERROR: Multiplayer object already in the game.");
                    }
                }
                
                // not dupe or not multiplayer - add it
                return this._layers[layer].scene.addChild(object);
            }
            else throw new Error("INVALID_LAYER: Layer ID is not valid.");
        }
        else throw new Error("GAME_NOT_STARTED: Game can only add objects after it has been started.");
    }

    public remove(target:SortableDraw2D, layer:GameLayer=GameLayer.MIDGROUND):boolean{
        // game must be initialized
        if(this.alreadyStarted){
            // layer must exist
            if(layer in this._layers){
                // remove from canvas
                if(this._layers[layer].scene.removeChild(target) !== null){
                    // removed - if multiplayer object delete it
                    if(target instanceof MPGameEntity){
                        this._multiplayerObjects.removeObject(target);
                    }
                    return true;
                }
                return false;
            }
            else throw new Error("INVALID_LAYER: Layer ID is not valid.");
        }
        else throw new Error("GAME_NOT_STARTED: Game can only remove objects after it has been started.");
    }

    public setMap(config:GameMapConfig):void{
        let layerConfigs:GameMapLayerConfig[] = [config.background, config.midground, config.background];
        
        layerConfigs.forEach((layerConfig, index) => {
            let mapConfig:MapConfig = {
                tileLayout: layerConfig.tileLayout,
                tileTypes:  layerConfig.tileTypes,
                tileSize:   config.tileSize,
                offsetX:    layerConfig.offsetX,
                offsetY:    layerConfig.offsetY,
                scene:      this._layers.layers[index].scene
            };

            let collisionGrid:CollisionGrid<Sprite> = MapUtils.buildGrid(mapConfig);
            if(layerConfig === config.midground){
                this._collisionGrid = collisionGrid;
            }
        });
    }

    public removeAllChildren():void{
        this._layers.removeAllChildren();
    }

    public resize(width:number, height:number):void{
        this._renderer.resize(width, height);
    }

    public get canvasWidth():number{
        return this._renderer.canvasWidth;
    }

    public get canvasHeight():number{
        return this._renderer.canvasHeight;
    }

    public get alreadyStarted():boolean{
        return this._started;
    }
}

class GameLayersHelper{
    public container:Sprite;
    public layers:{[id:number]: Sprite};

    constructor(){
        this.container = null;
        this.layers = null;
    }

    public createLayers():void{
        this.layers = {};

        this.layers[GameLayer.BACKGROUND] = new Sprite();
        this.layers[GameLayer.MIDGROUND] = new Sprite();
        this.layers[GameLayer.FOREGROUND] = new Sprite();
        this.layers[GameLayer.HUD] = new Sprite();

        this.container = new Sprite();
    }

    public destroyLayers():void{
        for(let layerID in this.layers){
            this.layers[layerID].scene.removeChildren();
            this.layers[layerID] = null;
        }

        this.layers = null;
    }

    public removeAllChildren():void{
        this.forEachLayer(layer => layer.scene.removeChildren());
    }

    private forEachLayer(fn:(layer:Sprite, layerID?:number)=>any):void{
        for(let layerID in this.layers){
            fn(this.layers[layerID], parseInt(layerID));
        }
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
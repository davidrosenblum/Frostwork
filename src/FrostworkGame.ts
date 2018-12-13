import { CollisionGrid } from "./CollisionGrid";
import { GameLayer } from "./Enums";
import { EventEmitter } from "./EventEmitter";
import { GameEntity } from "./GameEntity";
import { KeyboardWatcher } from "./KeyboardWatcher";
import { MapUtils } from "./MapUtils";
import { SortableDraw2D, GameMapConfig, GameMapLayerConfig, MapConfig, Bounds, GameMovementKeys } from "./Interfaces";
import { Renderer } from "./Renderer";
import { Scroller } from "./Scroller";
import { Sprite } from "./Sprite";

export class FrostworkGame extends EventEmitter{
    private _renderer:Renderer;
    private _layers:GameLayersHelper;
    private _keyWatcher:KeyboardWatcher;
    private _playerMovement:GamePlayerMovementHelper;
    private _collisionGrid:CollisionGrid<Sprite>;
    private _bounds:Bounds;
    private _scroller:Scroller;
    private _player:GameEntity;
    private _started:boolean;

    constructor(width?:number, height?:number){
        super();

        this._renderer = new Renderer(width, height);
        this._renderer.on("render", () => this.emit("render"));
        
        this._layers = new GameLayersHelper();

        this._keyWatcher = null;
        this._playerMovement = new GamePlayerMovementHelper();

        this._collisionGrid = null;
        this._bounds = null;

        this._scroller = null;

        this._started = false;

        this.setMapBounds(0, 0, width, height);
    }

    private update():void{
        if(this._player){
            this._playerMovement.updatePlayerMovement(this._keyWatcher, this._player, this._collisionGrid, this._bounds, this._scroller);
        }

        this.emit("update");
    }

    public start():void{
        if(!this.hasStarted){
            this._layers.createLayers();
            this._keyWatcher = new KeyboardWatcher();
            this._renderer.startRendering(this._layers.container.scene);
            this._started = true;
            this.emit("start");
        }
    }

    public togglePause():void{
        if(this.hasStarted){
            if(this._renderer.isRendering){
                this._renderer.stopRendering();
                this.emit("pause");
            }
            else{
                this._renderer.startRendering(this._layers.container.scene);
                this.emit("resume");
            }
        }
    }

    public stop():void{
        if(this.hasStarted){
            this._started = false;
            this._layers.destroyLayers();
            this._keyWatcher = null;
            this._renderer.stopRendering();
            this.emit("stop");
        }
    }

    public add(object:SortableDraw2D, layer:GameLayer=GameLayer.MIDGROUND):boolean{
        // game must be initialized
        if(this.hasStarted){
            // layer must exist
            if(layer in this._layers){
                return this._layers[layer].scene.addChild(object);
            }
            else throw new Error("INVALID_LAYER: Layer ID is not valid."); 
        }
        else throw new Error("GAME_NOT_STARTED: Game can only add objects after it has been started.");
    }

    public remove(target:SortableDraw2D, layer:GameLayer=GameLayer.MIDGROUND):boolean{
        // game must be initialized
        if(this.hasStarted){
            // layer must exist
            if(layer in this._layers){
                return this._layers[layer].scene.removeChild(target) !== null;
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

    public setMapBounds(x:number=0, y:number=0, width:number=-1, height:number=-1):void{
        if(width < 0) width = this.canvasWidth;
        if(height < 0) height = this.canvasHeight;

        this._bounds = { x, y, width, height };
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

    public get canvas():HTMLCanvasElement{
        return this._renderer.canvas;
    }

    public get keyWatcher():KeyboardWatcher{
        return this._keyWatcher;
    }

    public get mapBounds():Bounds{
        return this._bounds;
    }

    public get hasStarted():boolean{
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

class GamePlayerMovementHelper{
    public movementKeys:GameMovementKeys;

    constructor(){
        this.movementKeys = {
            up:       ["w"],
            down:     ["s"],
            left:     ["a"],
            right:    ["d"]
        };
    }

    public updatePlayerMovement(keyWatcher:KeyboardWatcher, player:GameEntity, grid:CollisionGrid<Sprite>, bounds:Bounds, scroller:Scroller):void{
        if(keyWatcher.numKeys > 0){
            if(keyWatcher.anyKeysDown(this.movementKeys.up)){
                player.moveUp(grid, bounds, scroller);
            }
            else if(keyWatcher.anyKeysDown(this.movementKeys.down)){
                player.moveDown(grid, bounds, scroller);
            }
            if(keyWatcher.anyKeysDown(this.movementKeys.left)){
                player.moveLeft(grid, bounds, scroller);
            }
            else if(keyWatcher.anyKeysDown(this.movementKeys.right)){
                player.moveRight(grid, bounds, scroller);
            }
        }
    }

    public setMovementKeys(movementKeys:GameMovementKeys):void{
        let { up, down, left, right } = movementKeys;
        this.movementKeys = { up, down, left, right };
    }
}
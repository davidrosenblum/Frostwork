import { BoundingBox } from "./BoundingBox";
import { InvalidLayerError } from "./Errors";
import { MapUtils, GeneratedMapData, LayeredMapConfig } from "./MapUtils";
import { Object2D } from "./Object2D";
import { Scene } from "./Scene";
import { Sprite } from "./Sprite";

export const enum GameLayer{
    BACKGROUND =    1,
    MIDGROUND =     2,
    FOREGROUND =    3,
    HUD =           4
}

export class MapLayers{
    private _container:Sprite;
    private _layers:{[layer:number]: Sprite};
    private _mapGrid:MapTileGrid;

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

        this._mapGrid = null;
    }

    public toggleMapGrid():void{
        if(this._mapGrid){
            this._mapGrid.parent ? this._mapGrid.remove() : this.add(this._mapGrid, GameLayer.HUD);
        }
    }

    private createMapGrid(config:LayeredMapConfig):void{
        this._mapGrid = new MapTileGrid(config.tileSize, config.tileSize);

        if(config.midground){
            this._mapGrid.x = config.midground.offsetX;
            this._mapGrid.y = config.midground.offsetY;
        }
    }

    public buildMap(config:LayeredMapConfig):GeneratedMapData{
        this.createMapGrid(config);

        let gmd:GeneratedMapData = MapUtils.buildLayerMap(
            config,
            this._layers[GameLayer.BACKGROUND].scene,
            this._layers[GameLayer.MIDGROUND].scene,
            this._layers[GameLayer.FOREGROUND].scene
        );

        this.depthSort();

        return gmd;
    }

    public addAt(object:Object2D, col:number, row:number, layer:GameLayer=GameLayer.MIDGROUND):boolean{
        if(this._mapGrid){
            if(this.add(object, layer)){
                object.x = col * this._mapGrid.width;
                object.y = row * this._mapGrid.height;

                if(object.height > this._mapGrid.height){
                    object.y -= (object.height - this._mapGrid.height);
                }

                return true;
            }
            return false;
        }
        else throw new Error("Unable to 'addAt()' if no map has been generated");
    }

    public add(object:Object2D, layer:GameLayer=GameLayer.MIDGROUND, depthSort:boolean=true):boolean{
        if(layer in this._layers){
            if(this._layers[layer].scene.addChild(object)){
                if(depthSort){
                    this.depthSort();
                }
                return true;
            }
            return false;
        }
        else throw new InvalidLayerError();
    }

    public remove(object:Object2D, layer:GameLayer=GameLayer.MIDGROUND):boolean{
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

    public processClick(evt:MouseEvent):void{
        let layer:Sprite = this._layers[GameLayer.MIDGROUND];
        let x:number = layer.x + evt.clientX;
        let y:number = layer.y + evt.clientY;

        let mouseBox:BoundingBox = new BoundingBox(x, y, 3, 3);

        this._layers[GameLayer.MIDGROUND].scene.forEachChild(child => {
            if(child.getBoundingBox().hitBoxTest(mouseBox)){
                child.emit("click", {
                    x: x + child.x,
                    y: y + child.y
                });
            }
        });
    }

    public get mapSprite():Sprite{
        return this._container;
    }
}

class MapTileGrid extends Object2D{
    public draw(ctx:CanvasRenderingContext2D, offsetX:number, offsetY:number):void{
        for(let row:number = 0; row < this.height; row++){
            for(let col:number = 0; col < this.width; col++){
                let x:number = col * this.width + offsetX;
                let y:number = row * this.height + offsetY;

                ctx.strokeRect(x, y, this.width, this.height);
            }
        }
    }
}
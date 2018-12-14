import { EventEmitter } from "./EventEmitter";
import { Scene } from "./Scene";

export class Renderer extends EventEmitter{
    private _canvas:HTMLCanvasElement;
    private _context:CanvasRenderingContext2D;
    private _scene:Scene;
    private _rendering:boolean;

    constructor(width:number=550, height:number=400){
        super();

        this._canvas = document.createElement("canvas");
        this._context = this._canvas.getContext("2d");       
        this._rendering = false;

        this.resize(width, height);
    }   

    private clear():void{
        this._context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    private renderFrame():void{
        this.emit("render");

        this.clear();
        this._scene.draw(this._context, 0, 0);

        if(this.isRendering){
            requestAnimationFrame(this.renderFrame.bind(this));
        }
    }   

    public startRendering(scene:Scene):void{
        this._rendering = true;
        this._scene = scene;
        requestAnimationFrame(this.renderFrame.bind(this));
    }

    public stopRendering():void{
        this._rendering = false;
        this._scene = null;
    }

    public resize(width:number, height:number):void{
        this._canvas.width = width;
        this._canvas.height = height;
    }

    public injectInto(element:HTMLElement|string):void{
        let tag:HTMLElement = (typeof element === "string") ? document.querySelector(element) : element;
        tag.appendChild(this._canvas);
    }

    public get canvasWidth():number{
        return this._canvas.width;
    }

    public get canvasHeight():number{
        return this._canvas.height;
    }

    public get canvas():HTMLCanvasElement{
        return this._canvas;
    }

    public get isRendering():boolean{
        return this._rendering;
    }
}
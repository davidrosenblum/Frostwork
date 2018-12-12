import { Scene } from "./Scene";

export class Renderer{
    private _canvas:HTMLCanvasElement;
    private _context:CanvasRenderingContext2D;
    private _rendering:boolean;

    constructor(){
        this._canvas = document.createElement("canvas");
        this._context = this._canvas.getContext("2d");       
        this._rendering = false;
    }   

    private renderFrame(scene:Scene):void{
        scene.draw(this._context, 0, 0);

        if(this.isRendering){
            requestAnimationFrame(this.renderFrame.bind(this));
        }
    }   

    public startRendering(scene:Scene):void{
        this._rendering = true;
        this.renderFrame(scene);
    }

    public stopRendering():void{
        this._rendering = false;
    }

    public resize(width:number, height:number):void{
        this._canvas.width = width;
        this._canvas.height = height;
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
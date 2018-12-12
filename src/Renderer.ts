import { Scene } from "./Scene";

export class Renderer{
    private _canvas:HTMLCanvasElement;
    private _context:CanvasRenderingContext2D;

    constructor(){
        this._canvas = document.createElement("canvas");
        this._context = this._canvas.getContext("2d");       
    }   

    public render(scene:Scene):void{
        
    }   

    public get canvas():HTMLCanvasElement{
        return this._canvas;
    }
}
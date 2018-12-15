import { EventEmitter } from "./EventEmitter";
import { Object2D } from "./Object2D";

export class Renderer extends EventEmitter{
    private _canvas:HTMLCanvasElement;
    private _context:CanvasRenderingContext2D;
    private _renderTarget:Object2D;
    private _rendering:boolean;

    constructor(width:number=550, height:number=400){
        super();

        this._canvas = document.createElement("canvas");
        this._context = this._canvas.getContext("2d");   
        this._renderTarget = null;    
        this._rendering = false;

        this.resize(width, height);
    }   

    private clear():void{
        this._context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    private renderFrame():void{
        this.emit("render");

        this.clear();
        this._renderTarget.draw(this._context, 0, 0);

        if(this.isRendering){
            requestAnimationFrame(this.renderFrame.bind(this));
        }
    }   

    public startRendering(target:Object2D):void{
        this._rendering = true;
        this._renderTarget = target;
        requestAnimationFrame(this.renderFrame.bind(this));
    }

    public stopRendering():void{
        this._rendering = false;
        this._renderTarget = null;
    }

    public resize(width:number, height:number):void{
        this._canvas.width = width;
        this._canvas.height = height;
    }

    public injectInto(element:HTMLElement|string):void{
        let tag:HTMLElement = (typeof element === "string") ? document.querySelector(element) : element;
        tag.appendChild(this._canvas);
    }

    public download(format:"jpg"|"png"="png", filename?:string):void{
        let a:HTMLAnchorElement = document.createElement("a");
        let data:string = this._canvas.toDataURL(`image/${format.replace("jpg", "jpeg")}`);

        let fname:string = filename || `capture_${Date.now()}`;
        fname = fname.replace(".jpg", "").replace(".png", "");

        a.setAttribute("href", data);
        a.setAttribute("download", `${fname}.${format}`);
        a.click();
    }

    public get target():Object2D{
        return this._renderTarget;
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
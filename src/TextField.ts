import { Object2D } from "./Object2D";

export class TextField extends Object2D{
    private static readonly CANVAS:HTMLCanvasElement = document.createElement("canvas");
    private static readonly CTX:CanvasRenderingContext2D = TextField.CANVAS.getContext("2d");

    public static defaultFont:string = "15px calibri";
    public static defaultFillColor:string = "white";
    public static defaultStrokeColor:string = "black";

    private _text:string;
    private _font:string;
    private _fillStyle:string;
    private _strokeStyle:string;
    private _maxWidth:number;

    constructor(text:string=null, x?:number, y?:number, font?:string, fillStyle?:string, strokeStyle?:string){
        super(x, y);

        this.text = text;
        this.font = font;
        this.fillStyle = fillStyle;
        this.strokeStyle = strokeStyle;
        this.maxWidth = undefined;
    }

    public draw(ctx:CanvasRenderingContext2D, offsetX:number=0, offsetY:number=0):void{
        if(this.visible){
            this.emit("draw");

            let x:number = this.x + offsetX;
            let y:number = this.y + offsetY;

            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.font = this.font;
            ctx.fillStyle = this.fillStyle;
            ctx.strokeStyle = this.strokeStyle;
            ctx.strokeText(this.text, x, y, this.maxWidth);
            ctx.fillText(this.text, x, y, this.maxWidth);
            ctx.restore();
        }
    }

    public centerText():void{
        if(this.parent){
            this.x = (this.parent.width - this.width) / 2;
        }
    }

    public set text(text:string){
        this._text = text || "";
    }

    public set font(font:string){
        this._font = font || TextField.defaultFont;
    }

    public set fillStyle(fillColor:string){
        this._fillStyle = fillColor || TextField.defaultFillColor;
    }

    public set strokeStyle(strokeColor:string){
        this._strokeStyle = strokeColor || TextField.defaultStrokeColor;
    }

    public set maxWidth(maxWidth:number){
        this._maxWidth = maxWidth || undefined;
    }

    public set width(width:number){
        // do nothing
    }

    public set height(height:number){
        // do nothing
    }

    public get width():number{
        TextField.CTX.font = this.font;
        return TextField.CTX.measureText(this.text).width;
    }

    public get height():number{
        return parseFloat(this.font) || 0;
    }

    public get text():string{
        return this._text;
    }

    public get font():string{
        return this._font;
    }

    public get strokeStyle():string{
        return this._strokeStyle;
    }

    public get fillStyle():string{
        return this._fillStyle;
    }

    public get maxWidth():number{
        return this._maxWidth;
    }
}
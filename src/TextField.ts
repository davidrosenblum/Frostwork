import { Object2D } from "./Object2D";

export class TextField extends Object2D{
    public static defaultFont:string = "15px calibri";
    public static defaultStrokeColor:string = "black";
    public static defaultFillColor:string = "white";

    private _text:string;
    private _font:string;
    private _fillColor:string;
    private _strokeColor:string;
    private _maxWidth:number;

    constructor(text:string=null, x?:number, y?:number, font?:string, fillColor?:string, strokeColor?:string){
        super(x, y);

        this.text = text;
        this.font = font;
        this.strokeColor = strokeColor;
        this.fillColor = fillColor;
        this.maxWidth = undefined;
    }

    public draw(ctx:CanvasRenderingContext2D, offsetX:number=0, offsetY:number=0):void{
        if(this.visible){
            this.emit("draw");

            let x:number = this.x + offsetX;
            let y:number = this.y + offsetY;

            ctx.fillText(this.text, x, y, this.maxWidth);
            ctx.strokeText(this.text, x, y, this.maxWidth);
        }
    }

    public set text(text:string){
        this._text = text || "";
    }

    public set font(font:string){
        this._fillColor = font || TextField.defaultFont;
    }

    public set strokeColor(strokeColor:string){
        this._strokeColor = strokeColor || TextField.defaultStrokeColor;
    }

    public set fillColor(fillColor:string){
        this._fillColor = fillColor || TextField.defaultFillColor;
    }

    public set maxWidth(maxWidth:number){
        this._maxWidth = maxWidth || undefined;
    }

    public get text():string{
        return this._text;
    }

    public get font():string{
        return this._font;
    }

    public get strokeColor():string{
        return this._strokeColor;
    }

    public get fillColor():string{
        return this._fillColor;
    }

    public get maxWidth():number{
        return this._maxWidth;
    }
}
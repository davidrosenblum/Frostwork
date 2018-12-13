export class Clock{
    private _then:number;

    constructor(){
        this._then = 0;
    }

    public getDelta():number{
        let now:number = Date.now();
        let delta:number = (now - this.then);

        this._then = now;

        return delta;
    }

    public get then():number{
        return this._then;
    }
}
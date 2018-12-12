
export class TokenGenerator{
    private static readonly VALS:string[] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");

    private _tokenSize:number;
    private _usedTokens:{[token:string]: boolean};

    constructor(tokenSize:number=16){
        this._tokenSize = tokenSize;
        this._usedTokens = {};
    }

    public static anyToken(tokenSize:number=16):string{
        let tokenBuffer = new Array<string>(tokenSize);

        for(let i:number = 0; i < tokenSize; i++){
            tokenBuffer[i] = TokenGenerator.VALS[
                Math.round(Math.random() * TokenGenerator.VALS.length)
            ];
        }

        return tokenBuffer.join("");
    }

    public nextToken():string{
        let token:string = null;

        do{
            token = TokenGenerator.anyToken(this.tokenSize);
        } while(this.hasToken(token))

        this._usedTokens[token] = true;

        return token;
    }

    public releaseToken(token:string):void{
        delete this._usedTokens[token];
    }

    public hasToken(token:string):boolean{
        return token in this._usedTokens;
    }

    public get tokenSize():number{
        return this._tokenSize;
    }
}

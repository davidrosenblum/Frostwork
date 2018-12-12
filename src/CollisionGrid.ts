import { Point } from "./Interfaces";

export class CollisionGrid<T>{
    private _grid:T[][];
    private _tileSize:number;

    constructor(rows:number, cols:number, tileSize:number){
        this._tileSize = tileSize;

        this._grid = new Array<T[]>(rows).fill(new Array<T>(cols));
    }

    public checkInBounds(row:number, col:number):boolean{
        return (row >= 0 && row < this._grid[0].length) &&
            (col >= 0 && col < this._grid.length);
    }

    public storeObjectAt(object:T, row:number, col:number):void{
        if(this.checkInBounds(row, col)){
            this._grid[row][col] = object;
        }
    }

    public getObjectAt(row:number, col:number):T{
        if(this.checkInBounds(row, col)){
            return this._grid[row][col] || null;
        }
        return null;
    }

    public getObjectAtPixels(x:number, y:number):T{
        let row:number = Math.round(x / this._tileSize);
        let col:number = Math.round(y / this._tileSize);

        return this.getObjectAt(row, col);  // checks bounds
    }

    public getObjectAtPoint(point:Point):T{
        return this.getObjectAtPixels(point.x, point.y);  // checks bounds
    }
}
import { EventEmitter } from "./EventEmitter";
import { GameEntityFacing } from "./Enums";
import { Scene } from "./Scene";
import { Sprite } from "./Sprite";

export interface FWEvent{
    type:string;
    emitter:EventEmitter;
}

export interface Point{
    x:number;
    y:number;
}

export interface Size{
    width:number;
    height:number;
    depth:number;
}

export interface Bounds{
    x:number;
    y:number;
    width:number;
    height:number;
}

export interface Draw2D{
    draw(ctx:CanvasRenderingContext2D, offsetX:number, offsetY:number):void;
}

export interface CollisionObject{
    hitBoxTest(target:CollisionObject):boolean;
    collisionTest(target:CollisionObject):boolean;
    hitBoxTests(target:CollisionObject[]):CollisionObject;
    collisionTests(target:CollisionObject[]):CollisionObject;
    collisionBounds:Size;
}

export interface SortableDraw2D extends Draw2D{
    id:string;
    bottom:number;
}

export interface SpriteConfig{
    image:string;
    x?:number;
    y?:number;
    width?:number;
    height?:number;
    depth?:number;
}

export interface MapConfig{
    tileLayout:number[][];
    tileTypes:(typeof Sprite)[];
    tileSize:number;
    scene:Scene;
    offsetX?:number;
    offsetY?:number;
}

export interface AnimationConfig{
    numFrames:number;
    clipWidth:number;
    clipHeight:number;
    marginX?:number;
    marginY?:number;
    offsetX?:number;
    offsetY?:number;
    axis:"x"|"y";
}

export interface AnimationFrameData{
    clipX:number;
    clipY:number;
    clipWidth:number;
    clipHeight:number;
}

export interface GameEntityData{
    x?:number;
    y?:number;
    facing?:GameEntityFacing;
    anim?:string;
    moveSpeed?:number;
    objectID:string;
    teamID?:string;
}
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Enums_1 = require("./Enums");
var EventEmitter_1 = require("./EventEmitter");
var MapUtils_1 = require("./MapUtils");
var MPGameEntity_1 = require("./MPGameEntity");
var Renderer_1 = require("./Renderer");
var Sprite_1 = require("./Sprite");
var Game = (function (_super) {
    __extends(Game, _super);
    function Game(width, height) {
        var _this = _super.call(this) || this;
        _this._renderer = new Renderer_1.Renderer(width, height);
        _this._multiplayerObjects = new GameObjectsHelper();
        _this._layers = new GameLayersHelper();
        _this._collisionGrid = null;
        _this._started = false;
        return _this;
    }
    Game.prototype.start = function () {
        if (!this.alreadyStarted) {
            this._layers.createLayers();
            this._renderer.startRendering(this._layers.container.scene);
            this._started = true;
        }
    };
    Game.prototype.togglePause = function () {
        if (this.alreadyStarted) {
            if (this._renderer.isRendering) {
                this._renderer.stopRendering();
            }
            else {
                this._renderer.startRendering(this._layers.container.scene);
            }
        }
    };
    Game.prototype.stop = function () {
        if (this.alreadyStarted) {
            this._started = false;
            this._layers.destroyLayers();
            this._renderer.stopRendering();
            this._multiplayerObjects.clear();
        }
    };
    Game.prototype.add = function (object, layer) {
        if (layer === void 0) { layer = Enums_1.GameLayer.MIDGROUND; }
        if (this.alreadyStarted) {
            if (layer in this._layers) {
                if (object instanceof MPGameEntity_1.MPGameEntity) {
                    if (!this._multiplayerObjects.addObject(object)) {
                        throw new Error("MP_ENTITY_ADD_ERROR: Multiplayer object already in the game.");
                    }
                }
                return this._layers[layer].scene.addChild(object);
            }
            else
                throw new Error("INVALID_LAYER: Layer ID is not valid.");
        }
        else
            throw new Error("GAME_NOT_STARTED: Game can only add objects after it has been started.");
    };
    Game.prototype.remove = function (target, layer) {
        if (layer === void 0) { layer = Enums_1.GameLayer.MIDGROUND; }
        if (this.alreadyStarted) {
            if (layer in this._layers) {
                if (this._layers[layer].scene.removeChild(target) !== null) {
                    if (target instanceof MPGameEntity_1.MPGameEntity) {
                        this._multiplayerObjects.removeObject(target);
                    }
                    return true;
                }
                return false;
            }
            else
                throw new Error("INVALID_LAYER: Layer ID is not valid.");
        }
        else
            throw new Error("GAME_NOT_STARTED: Game can only remove objects after it has been started.");
    };
    Game.prototype.setMap = function (config) {
        var _this = this;
        var layerConfigs = [config.background, config.midground, config.background];
        layerConfigs.forEach(function (layerConfig, index) {
            var mapConfig = {
                tileLayout: layerConfig.tileLayout,
                tileTypes: layerConfig.tileTypes,
                tileSize: config.tileSize,
                offsetX: layerConfig.offsetX,
                offsetY: layerConfig.offsetY,
                scene: _this._layers.layers[index].scene
            };
            var collisionGrid = MapUtils_1.MapUtils.buildGrid(mapConfig);
            if (layerConfig === config.midground) {
                _this._collisionGrid = collisionGrid;
            }
        });
    };
    Game.prototype.removeAllChildren = function () {
        this._layers.removeAllChildren();
    };
    Game.prototype.resize = function (width, height) {
        this._renderer.resize(width, height);
    };
    Object.defineProperty(Game.prototype, "canvasWidth", {
        get: function () {
            return this._renderer.canvasWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "canvasHeight", {
        get: function () {
            return this._renderer.canvasHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "alreadyStarted", {
        get: function () {
            return this._started;
        },
        enumerable: true,
        configurable: true
    });
    return Game;
}(EventEmitter_1.EventEmitter));
exports.Game = Game;
var GameLayersHelper = (function () {
    function GameLayersHelper() {
        this.container = null;
        this.layers = null;
    }
    GameLayersHelper.prototype.createLayers = function () {
        this.layers = {};
        this.layers[Enums_1.GameLayer.BACKGROUND] = new Sprite_1.Sprite();
        this.layers[Enums_1.GameLayer.MIDGROUND] = new Sprite_1.Sprite();
        this.layers[Enums_1.GameLayer.FOREGROUND] = new Sprite_1.Sprite();
        this.layers[Enums_1.GameLayer.HUD] = new Sprite_1.Sprite();
        this.container = new Sprite_1.Sprite();
    };
    GameLayersHelper.prototype.destroyLayers = function () {
        for (var layerID in this.layers) {
            this.layers[layerID].scene.removeChildren();
            this.layers[layerID] = null;
        }
        this.layers = null;
    };
    GameLayersHelper.prototype.removeAllChildren = function () {
        this.forEachLayer(function (layer) { return layer.scene.removeChildren(); });
    };
    GameLayersHelper.prototype.forEachLayer = function (fn) {
        for (var layerID in this.layers) {
            fn(this.layers[layerID], parseInt(layerID));
        }
    };
    return GameLayersHelper;
}());
var GameObjectsHelper = (function () {
    function GameObjectsHelper() {
        this.objects = null;
    }
    GameObjectsHelper.prototype.addObject = function (object) {
        if (this.containsObject(object)) {
            this.objects[object.objectID] = object;
            return true;
        }
        return false;
    };
    GameObjectsHelper.prototype.removeObject = function (object) {
        return delete this.objects[object.objectID];
    };
    GameObjectsHelper.prototype.updateObject = function (data) {
        var object = this.getObject(data.objectID);
        if (object) {
            object.applyUpdate(data);
            return true;
        }
        return false;
    };
    GameObjectsHelper.prototype.clear = function () {
        this.objects = {};
    };
    GameObjectsHelper.prototype.containsObject = function (object) {
        if (typeof object === "string") {
            return object in this.objects;
        }
        return object.objectID in this.objects;
    };
    GameObjectsHelper.prototype.getObject = function (objectID) {
        return this.objects[objectID] || null;
        ;
    };
    return GameObjectsHelper;
}());

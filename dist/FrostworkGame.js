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
var Clock_1 = require("./Clock");
var Enums_1 = require("./Enums");
var EventEmitter_1 = require("./EventEmitter");
var KeyboardWatcher_1 = require("./KeyboardWatcher");
var MapUtils_1 = require("./MapUtils");
var Renderer_1 = require("./Renderer");
var Sprite_1 = require("./Sprite");
var FrostworkGame = (function (_super) {
    __extends(FrostworkGame, _super);
    function FrostworkGame(width, height) {
        var _this = _super.call(this) || this;
        _this._renderer = new Renderer_1.Renderer(width, height);
        _this._renderer.on("render", function () { return _this.emit("render"); });
        _this._layers = new GameLayersHelper();
        _this._keyWatcher = null;
        _this._playerMovement = new GamePlayerMovementHelper();
        _this._clock = new Clock_1.Clock();
        _this._collisionGrid = null;
        _this._bounds = null;
        _this._scroller = null;
        _this._initialized = false;
        _this.setMapBounds(0, 0, width, height);
        return _this;
    }
    FrostworkGame.prototype.update = function () {
        if (this._player) {
            this._playerMovement.updatePlayerMovement(this._keyWatcher, this._player, this._collisionGrid, this._bounds, this._scroller);
        }
        this.emit("update");
    };
    FrostworkGame.prototype.init = function () {
        if (!this.isInitialized) {
            this._layers.createLayers();
            this._keyWatcher = new KeyboardWatcher_1.KeyboardWatcher();
            this._renderer.startRendering(this._layers.container.scene);
            this._initialized = true;
            this.emit("start");
        }
    };
    FrostworkGame.prototype.start = function () {
        if (this.isInitialized) {
            this._renderer.startRendering(this._layers.container.scene);
            this.emit("start");
        }
        else
            throw new Error("INIT_ERR: Please initialize the game before starting by calling the .init() method.");
    };
    FrostworkGame.prototype.togglePause = function () {
        if (this.isInitialized) {
            if (this._renderer.isRendering) {
                this._renderer.stopRendering();
                this.emit("pause");
            }
            else {
                this._renderer.startRendering(this._layers.container.scene);
                this.emit("resume");
            }
        }
    };
    FrostworkGame.prototype.stop = function () {
        if (this.isInitialized) {
            this._initialized = false;
            this._layers.destroyLayers();
            this._keyWatcher = null;
            this._renderer.stopRendering();
            this.emit("stop");
        }
    };
    FrostworkGame.prototype.add = function (object, layer) {
        if (layer === void 0) { layer = Enums_1.GameLayer.MIDGROUND; }
        if (this.isInitialized) {
            if (layer in this._layers) {
                return this._layers[layer].scene.addChild(object);
            }
            else
                throw new Error("INVALID_LAYER: Layer ID is not valid.");
        }
        else
            throw new Error("GAME_NOT_STARTED: Game can only add objects after it has been started.");
    };
    FrostworkGame.prototype.remove = function (target, layer) {
        if (layer === void 0) { layer = Enums_1.GameLayer.MIDGROUND; }
        if (this.isInitialized) {
            if (layer in this._layers) {
                return this._layers[layer].scene.removeChild(target) !== null;
            }
            else
                throw new Error("INVALID_LAYER: Layer ID is not valid.");
        }
        else
            throw new Error("GAME_NOT_STARTED: Game can only remove objects after it has been started.");
    };
    FrostworkGame.prototype.setMap = function (config) {
        var _this = this;
        var layerConfigs = [config.background || null, config.midground || null, config.foreground || null];
        layerConfigs.forEach(function (layerConfig, index) {
            if (layerConfig) {
                var mapConfig = {
                    tileLayout: layerConfig.tileLayout,
                    tileTypes: layerConfig.tileTypes,
                    tileSize: config.tileSize,
                    offsetX: layerConfig.offsetX,
                    offsetY: layerConfig.offsetY,
                    scene: _this._layers.layers[index + 1].scene
                };
                var collisionGrid = MapUtils_1.MapUtils.buildGrid(mapConfig);
                if (layerConfig === config.midground) {
                    _this._collisionGrid = collisionGrid;
                }
            }
        });
    };
    FrostworkGame.prototype.setMapBounds = function (x, y, width, height) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (width === void 0) { width = -1; }
        if (height === void 0) { height = -1; }
        if (width < 0)
            width = this.canvasWidth;
        if (height < 0)
            height = this.canvasHeight;
        this._bounds = { x: x, y: y, width: width, height: height };
    };
    FrostworkGame.prototype.removeAllChildren = function () {
        this._layers.removeAllChildren();
    };
    FrostworkGame.prototype.resize = function (width, height) {
        this._renderer.resize(width, height);
    };
    FrostworkGame.prototype.injectInto = function (element) {
        this._renderer.injectInto(element);
    };
    Object.defineProperty(FrostworkGame.prototype, "canvasWidth", {
        get: function () {
            return this._renderer.canvasWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrostworkGame.prototype, "canvasHeight", {
        get: function () {
            return this._renderer.canvasHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrostworkGame.prototype, "canvas", {
        get: function () {
            return this._renderer.canvas;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrostworkGame.prototype, "keyWatcher", {
        get: function () {
            return this._keyWatcher;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrostworkGame.prototype, "mapBounds", {
        get: function () {
            return this._bounds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrostworkGame.prototype, "isInitialized", {
        get: function () {
            return this._initialized;
        },
        enumerable: true,
        configurable: true
    });
    return FrostworkGame;
}(EventEmitter_1.EventEmitter));
exports.FrostworkGame = FrostworkGame;
var GameLayersHelper = (function () {
    function GameLayersHelper() {
        this.container = null;
        this.layers = null;
    }
    GameLayersHelper.prototype.createLayers = function () {
        var _this = this;
        this.layers = {};
        this.layers[Enums_1.GameLayer.BACKGROUND] = new Sprite_1.Sprite();
        this.layers[Enums_1.GameLayer.MIDGROUND] = new Sprite_1.Sprite();
        this.layers[Enums_1.GameLayer.FOREGROUND] = new Sprite_1.Sprite();
        this.layers[Enums_1.GameLayer.HUD] = new Sprite_1.Sprite();
        this.container = new Sprite_1.Sprite();
        this.forEachLayer(function (layer) { return _this.container.scene.addChild(layer); });
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
var GamePlayerMovementHelper = (function () {
    function GamePlayerMovementHelper() {
        this.movementKeys = {
            up: ["w"],
            down: ["s"],
            left: ["a"],
            right: ["d"]
        };
    }
    GamePlayerMovementHelper.prototype.updatePlayerMovement = function (keyWatcher, player, grid, bounds, scroller) {
        if (keyWatcher.numKeys > 0) {
            if (keyWatcher.anyKeysDown(this.movementKeys.up)) {
                player.moveUp(grid, bounds, scroller);
            }
            else if (keyWatcher.anyKeysDown(this.movementKeys.down)) {
                player.moveDown(grid, bounds, scroller);
            }
            if (keyWatcher.anyKeysDown(this.movementKeys.left)) {
                player.moveLeft(grid, bounds, scroller);
            }
            else if (keyWatcher.anyKeysDown(this.movementKeys.right)) {
                player.moveRight(grid, bounds, scroller);
            }
        }
    };
    GamePlayerMovementHelper.prototype.setMovementKeys = function (movementKeys) {
        var up = movementKeys.up, down = movementKeys.down, left = movementKeys.left, right = movementKeys.right;
        this.movementKeys = { up: up, down: down, left: left, right: right };
    };
    return GamePlayerMovementHelper;
}());

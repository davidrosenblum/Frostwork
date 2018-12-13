"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KeyboardWatcher = (function () {
    function KeyboardWatcher(element) {
        this._keys = {};
        this._numKeys = 0;
        element.addEventListener("keyup", this.handleKeyUp.bind(this));
        element.addEventListener("keydown", this.handleKeyDown.bind(this));
    }
    KeyboardWatcher.prototype.handleKeyUp = function (evt) {
        this.forceKeyUp(evt.key);
    };
    KeyboardWatcher.prototype.handleKeyDown = function (evt) {
        this.forceKeyDown(evt.key);
    };
    KeyboardWatcher.prototype.forceKeyUp = function (key) {
        if (this.isKeyDown(key)) {
            delete this._keys[key];
            this._numKeys--;
        }
    };
    KeyboardWatcher.prototype.forceKeyDown = function (key) {
        if (this.isKeyUp(key)) {
            this._keys[key] = true;
            this._numKeys++;
        }
    };
    KeyboardWatcher.prototype.isKeyUp = function (key) {
        return key in this._keys === false;
    };
    KeyboardWatcher.prototype.isKeyDown = function (key) {
        return key in this._keys;
    };
    KeyboardWatcher.prototype.anyKeysUp = function (keys) {
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (this.isKeyUp(key)) {
                return true;
            }
        }
        return false;
    };
    KeyboardWatcher.prototype.anyKeysDown = function (keys) {
        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
            var key = keys_2[_i];
            if (this.isKeyDown(key)) {
                return true;
            }
        }
        return false;
    };
    KeyboardWatcher.prototype.allKeysUp = function (keys) {
        return !this.anyKeysDown(keys);
    };
    KeyboardWatcher.prototype.allKeysDown = function (keys) {
        return !this.anyKeysUp(keys);
    };
    Object.defineProperty(KeyboardWatcher.prototype, "numKeys", {
        get: function () {
            return this._numKeys;
        },
        enumerable: true,
        configurable: true
    });
    return KeyboardWatcher;
}());
exports.KeyboardWatcher = KeyboardWatcher;

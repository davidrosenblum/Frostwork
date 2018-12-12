"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TokenGenerator = (function () {
    function TokenGenerator(tokenSize) {
        if (tokenSize === void 0) { tokenSize = 16; }
        this._tokenSize = tokenSize;
        this._usedTokens = {};
    }
    TokenGenerator.anyToken = function (tokenSize) {
        if (tokenSize === void 0) { tokenSize = 16; }
        var tokenBuffer = new Array(tokenSize);
        for (var i = 0; i < tokenSize; i++) {
            tokenBuffer[i] = TokenGenerator.VALS[Math.round(Math.random() * TokenGenerator.VALS.length)];
        }
        return tokenBuffer.join("");
    };
    TokenGenerator.prototype.nextToken = function () {
        var token = null;
        do {
            token = TokenGenerator.anyToken(this.tokenSize);
        } while (this.hasToken(token));
        this._usedTokens[token] = true;
        return token;
    };
    TokenGenerator.prototype.releaseToken = function (token) {
        delete this._usedTokens[token];
    };
    TokenGenerator.prototype.hasToken = function (token) {
        return token in this._usedTokens;
    };
    Object.defineProperty(TokenGenerator.prototype, "tokenSize", {
        get: function () {
            return this._tokenSize;
        },
        enumerable: true,
        configurable: true
    });
    TokenGenerator.VALS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    return TokenGenerator;
}());
exports.TokenGenerator = TokenGenerator;

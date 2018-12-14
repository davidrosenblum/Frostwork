"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AssetUtils = (function () {
    function AssetUtils() {
    }
    AssetUtils.loadImage = function (url) {
        if (url in AssetUtils.images) {
            return Promise.resolve(AssetUtils.images[url]);
        }
        else if (url in AssetUtils.loadingImages) {
            return AssetUtils.loadingImages[url];
        }
        return new Promise(function (resolve, reject) {
            var image = document.createElement("img");
            image.addEventListener("load", function () {
                AssetUtils.images[url] = image;
                resolve(image);
            });
            image.addEventListener("error", function (err) { return reject(new Error(err.message)); });
            image.setAttribute("src", url);
        });
    };
    AssetUtils.loadAudio = function (url) {
        if (url in AssetUtils.sounds) {
            return Promise.resolve(AssetUtils.sounds[url]);
        }
        else if (url in AssetUtils.loadingSounds) {
            return AssetUtils.loadingSounds[url];
        }
        return new Promise(function (resolve, reject) {
            var audio = document.createElement("audio");
            audio.addEventListener("load", function () {
                AssetUtils.sounds[url] = audio;
                resolve(audio);
            });
            audio.addEventListener("error", function (err) { return reject(new Error(err.message)); });
            audio.setAttribute("src", url);
        });
    };
    AssetUtils.loadImages = function (urls) {
        return new Promise(function (resolve) {
            var loaded = 0;
            var errors = 0;
            urls.forEach(function (url) {
                AssetUtils.loadImage(url)
                    .then(function () { return ++loaded; })
                    .catch(function () { return ++errors; })
                    .then(function () {
                    if (loaded + errors === urls.length) {
                        resolve({ loaded: loaded, errors: errors });
                    }
                });
            });
        });
    };
    AssetUtils.loadAudios = function (urls) {
        return new Promise(function (resolve) {
            var loaded = 0;
            var errors = 0;
            urls.forEach(function (url) {
                AssetUtils.loadAudio(url)
                    .then(function () { return ++loaded; })
                    .catch(function () { return ++errors; })
                    .then(function () {
                    if (loaded + errors === urls.length) {
                        resolve({ loaded: loaded, errors: errors });
                    }
                });
            });
        });
    };
    AssetUtils.getImage = function (url) {
        return AssetUtils.images[url] || null;
    };
    AssetUtils.getAudio = function (url) {
        return AssetUtils.sounds[url] || null;
    };
    AssetUtils.images = {};
    AssetUtils.sounds = {};
    AssetUtils.loadingImages = {};
    AssetUtils.loadingSounds = {};
    return AssetUtils;
}());
exports.AssetUtils = AssetUtils;

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
    AssetUtils.loadSound = function (url) {
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
        if (urls.length === 0)
            return Promise.resolve({ loaded: 0, errors: 0 });
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
    AssetUtils.loadSounds = function (urls) {
        if (urls.length === 0)
            return Promise.resolve({ loaded: 0, errors: 0 });
        return new Promise(function (resolve) {
            var loaded = 0;
            var errors = 0;
            urls.forEach(function (url) {
                AssetUtils.loadSound(url)
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
    AssetUtils.loadAliases = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var imageUrls = [];
            Object.keys(AssetUtils.imageAliases).forEach(function (alias) { return imageUrls.push(AssetUtils.imageAliases[alias]); });
            var soundUrls = [];
            Object.keys(AssetUtils.soundAliases).forEach(function (alias) { return soundUrls.push(AssetUtils.soundAliases[alias]); });
            var imageReport = null;
            var soundReport = null;
            _this.loadImages(imageUrls).then(function (report) {
                imageReport = report;
                if (soundReport)
                    resolve({ sounds: soundReport, images: imageReport });
            });
            _this.loadSounds(soundUrls).then(function (report) {
                soundReport = report;
                if (imageReport)
                    resolve({ sounds: soundReport, images: imageReport });
            });
        });
    };
    AssetUtils.setImageAlias = function (alias, url) {
        AssetUtils.imageAliases[alias] = url;
    };
    AssetUtils.setSoundAlias = function (alias, url) {
        AssetUtils.soundAliases[alias] = url;
    };
    AssetUtils.setImageAliasMany = function (aliases) {
        for (var alias in aliases) {
            AssetUtils.setImageAlias(alias, aliases[alias]);
        }
    };
    AssetUtils.setSoundAliasMany = function (aliases) {
        for (var alias in aliases) {
            AssetUtils.setSoundAlias(alias, aliases[alias]);
        }
    };
    AssetUtils.getImageURLByAlias = function (alias) {
        return AssetUtils.imageAliases[alias] || null;
    };
    AssetUtils.getSoundURLByAlias = function (alias) {
        return AssetUtils.soundAliases[alias] || null;
    };
    AssetUtils.getImageByAlias = function (alias) {
        var url = AssetUtils.imageAliases[alias] || null;
        return url ? AssetUtils.getImage(url) : null;
    };
    AssetUtils.getAudioByAlias = function (alias) {
        var url = AssetUtils.soundAliases[alias] || null;
        return url ? AssetUtils.getAudio(url) : null;
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
    AssetUtils.imageAliases = {};
    AssetUtils.soundAliases = {};
    return AssetUtils;
}());
exports.AssetUtils = AssetUtils;

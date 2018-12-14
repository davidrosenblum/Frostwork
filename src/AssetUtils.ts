interface AssetLoadReport{
    errors:number;
    loaded:number;
}

export class AssetUtils{
    private static images:{[url:string]: HTMLImageElement} = {};
    private static sounds:{[url:string]: HTMLAudioElement} = {};

    private static loadingImages:{[url:string]: Promise<HTMLImageElement>} = {};
    private static loadingSounds:{[url:string]: Promise<HTMLAudioElement>} = {};

    private static imageAliases:{[url:string]: string} = {};
    private static soundAliases:{[url:string]: string} = {};

    public static loadImage(url:string):Promise<HTMLImageElement>{
        if(url in AssetUtils.images){
            return Promise.resolve(AssetUtils.images[url]);
        }
        else if(url in AssetUtils.loadingImages){
            return AssetUtils.loadingImages[url];
        }

        return new Promise((resolve, reject) => {
            let image:HTMLImageElement = document.createElement("img");

            image.addEventListener("load", () => {
                AssetUtils.images[url] = image;
                resolve(image);
            });

            image.addEventListener("error", err => reject(new Error(err.message)));

            image.setAttribute("src", url);
        });
    }

    public static loadSound(url:string):Promise<HTMLAudioElement>{
        if(url in AssetUtils.sounds){
            return Promise.resolve(AssetUtils.sounds[url]);
        }
        else if(url in AssetUtils.loadingSounds){
            return AssetUtils.loadingSounds[url];
        }

        return new Promise((resolve, reject) => {
            let audio:HTMLAudioElement = document.createElement("audio");

            audio.addEventListener("load", () => {
                AssetUtils.sounds[url] = audio;
                resolve(audio);
            });

            audio.addEventListener("error", err => reject(new Error(err.message)));

            audio.setAttribute("src", url);
        });
    }

    public static loadImages(urls:string[]):Promise<AssetLoadReport>{
        if(urls.length === 0) return Promise.resolve({loaded: 0, errors: 0});

        return new Promise(resolve => {
            let loaded:number = 0;
            let errors:number = 0;

            urls.forEach(url => {
                AssetUtils.loadImage(url)
                    .then(() => ++loaded)
                    .catch(() => ++errors)
                    .then(() => {
                        if(loaded + errors === urls.length){
                            resolve({loaded, errors});
                        }
                    });
            });
        });
    }

    public static loadSounds(urls:string[]):Promise<AssetLoadReport>{
        if(urls.length === 0) return Promise.resolve({loaded: 0, errors: 0});

        return new Promise(resolve => {
            let loaded:number = 0;
            let errors:number = 0;
            
            urls.forEach(url => {
                AssetUtils.loadSound(url)
                    .then(() => ++loaded)
                    .catch(() => ++errors)
                    .then(() => {
                        if(loaded + errors === urls.length){
                            resolve({loaded, errors});
                        }
                    });
            });
        });
    }

    public static loadAliases():Promise<{sounds:AssetLoadReport, images:AssetLoadReport}>{
        return new Promise(resolve => {
            // get image urls from aliases
            let imageUrls:string[] = [];
            Object.keys(AssetUtils.imageAliases).forEach(alias => imageUrls.push(AssetUtils.imageAliases[alias]));

            // get sound urls from aliases
            let soundUrls:string[] = [];
            Object.keys(AssetUtils.soundAliases).forEach(alias => soundUrls.push(AssetUtils.soundAliases[alias]));

            // prep load
            let imageReport:AssetLoadReport = null;
            let soundReport:AssetLoadReport = null;

            // load images
            this.loadImages(imageUrls).then(report => {
                imageReport = report;
                if(soundReport) resolve({sounds: soundReport, images: imageReport});
            });

            // load sounds
            this.loadSounds(soundUrls).then(report => {
                soundReport = report;
                if(imageReport) resolve({sounds: soundReport, images: imageReport});
            })
        });
    }

    public static setImageAlias(alias:string, url:string):void{
        AssetUtils.imageAliases[alias] = url;
    }

    public static setSoundAlias(alias:string, url:string):void{
        AssetUtils.soundAliases[alias] = url;
    }

    public static setImageAliasMany(aliases:{[alias:string]: string}):void{
        for(let alias in aliases){
            AssetUtils.setImageAlias(alias, aliases[alias]);
        }
    }

    public static setSoundAliasMany(aliases:{[alias:string]: string}):void{
        for(let alias in aliases){
            AssetUtils.setSoundAlias(alias, aliases[alias]);
        }
    }

    public static getImageURLByAlias(alias:string):string{
        return AssetUtils.imageAliases[alias] || null;
    }

    public static getSoundURLByAlias(alias:string):string{
        return AssetUtils.soundAliases[alias] || null;
    }

    public static getImageByAlias(alias:string):HTMLImageElement{
        let url:string = AssetUtils.imageAliases[alias] || null;
        return url ? AssetUtils.getImage(url) : null;
    }

    public static getAudioByAlias(alias:string):HTMLAudioElement{
        let url:string = AssetUtils.soundAliases[alias] || null;
        return url ? AssetUtils.getAudio(url) : null;
    }

    public static getImage(url:string):HTMLImageElement{
        return AssetUtils.images[url] || null;
    }

    public static getAudio(url:string):HTMLAudioElement{
        return AssetUtils.sounds[url] || null;
    }
}
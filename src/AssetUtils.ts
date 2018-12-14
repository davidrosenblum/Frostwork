export class AssetUtils{
    private static images:{[url:string]: HTMLImageElement} = {};
    private static sounds:{[url:string]: HTMLAudioElement} = {};

    private static loadingImages:{[url:string]: Promise<HTMLImageElement>} = {};
    private static loadingSounds:{[url:string]: Promise<HTMLAudioElement>} = {};

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

    public static loadAudio(url:string):Promise<HTMLAudioElement>{
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

    public static loadImages(urls:string[]):Promise<{loaded:number, errors:number}>{
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

    public static loadAudios(urls:string[]):Promise<{loaded:number, errors:number}>{
        return new Promise(resolve => {
            let loaded:number = 0;
            let errors:number = 0;
            
            urls.forEach(url => {
                AssetUtils.loadAudio(url)
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

    public static getImage(url:string):HTMLImageElement{
        return AssetUtils.images[url] || null;
    }

    public static getAudio(url:string):HTMLAudioElement{
        return AssetUtils.sounds[url] || null;
    }
}
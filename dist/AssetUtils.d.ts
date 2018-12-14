interface AssetLoadReport {
    errors: number;
    loaded: number;
}
export declare class AssetUtils {
    private static images;
    private static sounds;
    private static loadingImages;
    private static loadingSounds;
    private static imageAliases;
    private static soundAliases;
    static loadImage(url: string): Promise<HTMLImageElement>;
    static loadSound(url: string): Promise<HTMLAudioElement>;
    static loadImages(urls: string[]): Promise<AssetLoadReport>;
    static loadSounds(urls: string[]): Promise<AssetLoadReport>;
    static loadAliases(): Promise<{
        sounds: AssetLoadReport;
        images: AssetLoadReport;
    }>;
    static setImageAlias(alias: string, url: string): void;
    static setSoundAlias(alias: string, url: string): void;
    static setImageAliasMany(aliases: {
        [alias: string]: string;
    }): void;
    static setSoundAliasMany(aliases: {
        [alias: string]: string;
    }): void;
    static getImageURLByAlias(alias: string): string;
    static getSoundURLByAlias(alias: string): string;
    static getImageByAlias(alias: string): HTMLImageElement;
    static getAudioByAlias(alias: string): HTMLAudioElement;
    static getImage(url: string): HTMLImageElement;
    static getAudio(url: string): HTMLAudioElement;
}
export {};

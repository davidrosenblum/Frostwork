export declare class AssetUtils {
    private static images;
    private static sounds;
    private static loadingImages;
    private static loadingSounds;
    static loadImage(url: string): Promise<HTMLImageElement>;
    static loadAudio(url: string): Promise<HTMLAudioElement>;
    static loadImages(urls: string[]): Promise<{
        loaded: number;
        errors: number;
    }>;
    static loadAudios(urls: string[]): Promise<{
        loaded: number;
        errors: number;
    }>;
    static getImage(url: string): HTMLImageElement;
    static getAudio(url: string): HTMLAudioElement;
}

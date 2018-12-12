export declare class AssetUtils {
    private static images;
    private static sounds;
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
}

export declare class TokenGenerator {
    private static readonly VALS;
    private _tokenSize;
    private _usedTokens;
    constructor(tokenSize?: number);
    static anyToken(tokenSize?: number): string;
    nextToken(): string;
    releaseToken(token: string): void;
    hasToken(token: string): boolean;
    readonly tokenSize: number;
}

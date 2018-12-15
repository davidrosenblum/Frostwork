export class InvalidLayerError implements Error{
    public get name():string{
        return "InvalidLayerError";
    }

    public get message():string{
        return "Layer ID does note exist (check the enum).";
    }
}
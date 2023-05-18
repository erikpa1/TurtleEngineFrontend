export default class AssetParent {


    public relativePath = ""

    public uid = ""
    public name = ""
    public description = ""


    static tmp(): string {
        return "Hello"
    }


    GetPreviewPath(): string {
        return this.relativePath//`${this.relativePath}${this.uid}/Preview.png`
    }


}
export default class AssetParent {


    public relativePath = ""

    public uid = ""
    public name = ""
    public description = ""

    static LANG = "core.asset"
    static LANG_PLURAL = "core.assets"

    static tmp(): string {
        return "Hello"
    }


    GetPreviewPath(): string {
        return this.relativePath//`${this.relativePath}${this.uid}/Preview.png`
    }


}
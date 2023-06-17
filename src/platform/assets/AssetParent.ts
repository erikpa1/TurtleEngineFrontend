export default class AssetParent {

    public relativePath = ""

    public uid = ""
    public parent_project_uid = ""
    public parent_project_path = ""
    public name = ""
    public description = ""
    public extension = ""

    static LANG = "core.asset"
    static LANG_PLURAL = "core.assets"

    static tmp(): string {
        return "Hello"
    }

    GetPreviewPath(): string {
        return this.relativePath//`${this.relativePath}${this.uid}/Preview.png`
    }

    from_json(jObject: any) {
        this.uid = jObject.uid ?? ""
        this.name = jObject.name ?? ""
        this.description = jObject.description ?? ""
        this.extension = jObject.extension ?? ""
    }


}
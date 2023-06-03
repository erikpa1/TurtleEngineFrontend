export default class AssetParentLight {
    public uid = ""
    public parent_project_uid = ""
    public name = ""
    public type = ""
    public description = ""
    public relativePath = ""
    public hasPreview = false

    from_json(jObject: any | AssetParentLight) {
        this.uid = jObject.uid ?? ""
        this.name = jObject.name ?? ""
        this.type = jObject.assetType ?? ""
        this.description = jObject.description ?? ""
        this.hasPreview = jObject.hasPreview ?? false

        if (!this.hasPreview) {
            this.relativePath = `/dev/assets/${this.type}/tmp-${this.type}/Preview.png`
        }

    }

    GetPreviewPath(): string {
        return this.relativePath//`${this.relativePath}${this.uid}/Preview.png`
    }
}
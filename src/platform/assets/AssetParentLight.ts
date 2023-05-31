export default class AssetParentLight {
    public uid = ""
    public name = ""
    public assetType = ""
    public description = ""
    public previewPath = ""
    public relativePath = ""
    public hasPreview = false

    from_json(jObject: any | AssetParentLight) {
        this.uid = jObject.uid ?? ""
        this.name = jObject.name ?? ""
        this.assetType = jObject.assetType ?? ""
        this.description = jObject.description ?? ""
        this.hasPreview = jObject.hasPreview ?? false

        if (this.hasPreview) {
            this.relativePath = `/dev/assets/${this.assetType}/tmp-${this.assetType}/Preview.png`
        }
    }

    GetPreviewPath(): string {
        return this.relativePath//`${this.relativePath}${this.uid}/Preview.png`
    }
}
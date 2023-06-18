import FsTools from "@api/FsTools";
import {AssetConstants} from "@platform/assets/AssetConstants";

export default class AssetParentLight {
    public uid = ""
    public parent_project_uid = ""
    public name = ""
    public assetType = ""
    public description = ""
    public relativePath = ""

    public hasPreview = false
    public absolutePath = ""

    from_json(jObject: any | AssetParentLight) {
        this.uid = jObject.uid ?? ""
        this.name = jObject.name ?? ""
        this.assetType = jObject.assetType ?? ""
        this.description = jObject.description ?? ""
        this.hasPreview = jObject.hasPreview ?? false

        if (!this.hasPreview) {
            this.relativePath = `/dev/assets/${this.assetType}/tmp-${this.assetType}/Preview.png`
        }
    }

    GetPreviewPath(): string {
        if (this.hasPreview) {
            const path = FsTools.GetProjectsPath(`${this.parent_project_uid}/${AssetConstants.GetFolderOnType(this.assetType)}/${this.uid}/Preview.png`)
            return path
        } else {
            return FsTools.GetPlatformPath(`Images/Previews/${this.assetType}-Preview.png`)
        }
    }

    GetFolderPath(): string {
        return FsTools.GetProjectsPath(`${this.parent_project_uid}/${AssetConstants.GetFolderOnType(this.assetType)}/${this.uid}/`)
    }

}
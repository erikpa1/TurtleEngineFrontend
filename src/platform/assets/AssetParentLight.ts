import FsTools from "@api/FsTools";
import {AssetConstants} from "@platform/assets/AssetConstants";
import {AssetDefinition} from "@platform/assets/Assets.ts";

export default class AssetParentLight {
    public uid = ""
    public parent_project_uid = ""
    public name = ""
    public type = ""
    public subtype = ""
    public description = ""
    public relativePath = ""
    public assetDefinition: AssetDefinition | any = null

    public hasPreview = false
    public absolutePath = ""

    from_json(jObject: any | AssetParentLight) {

        this.uid = jObject.uid ?? ""
        this.name = jObject.name ?? ""
        this.type = jObject.type ?? ""
        this.subtype = jObject.subtype ?? ""
        this.description = jObject.description ?? ""
        this.hasPreview = jObject.hasPreview ?? false

        if (!this.hasPreview) {
            this.relativePath = `/dev/assets/${this.type}/tmp-${this.type}/Preview.png`
        }
    }

    GetPreviewPath(): string {
        if (this.hasPreview) {
            const path = FsTools.GetProjectsPath(`${this.parent_project_uid}/${AssetConstants.GetFolderOnType(this.type)}/${this.uid}/Preview.png`)
            return path
        } else {
            return FsTools.GetPlatformPath(`Images/Previews/${this.type}-Preview.png`)
        }
    }

    GetFolderPath(): string {
        return FsTools.GetProjectsPath(`${this.parent_project_uid}/${AssetConstants.GetFolderOnType(this.type)}/${this.uid}/`)
    }

    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,
            type: this.type,
            subtype: this.subtype,
            description: this.description,
        }
    }

}
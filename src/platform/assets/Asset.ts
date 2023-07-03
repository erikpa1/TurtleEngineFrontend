import FsTools from "@api/FsTools";

import {AssetDefinition} from "@platform/assets/Assets";

export default class Asset {
    public uid = ""
    public parent_project_uid = ""
    public name = ""
    public type = ""
    public subtype = ""
    public tags = ""
    public description = ""
    public relativePath = ""
    public assetDefinition: AssetDefinition | any = null

    public hasPreview = false
    public absolutePath = ""

    FromJson(jObject: any | Asset) {

        this.uid = jObject.uid ?? ""
        this.name = jObject.name ?? ""
        this.type = jObject.type ?? ""
        this.subtype = jObject.subtype ?? ""
        this.description = jObject.description ?? ""
        this.hasPreview = jObject.hasPreview ?? false
        this.tags = jObject.tags ?? ""

        console.log(jObject)

        if (!this.hasPreview) {
            this.relativePath = `/dev/assets/${this.type}/tmp-${this.type}/Preview.png`
        }
    }

    GetPreviewPath(): string {
        if (this.hasPreview) {
            const path = FsTools.GetPathInProject(this.parent_project_uid, `/Assets/${this.uid}/Preview.png`)
            return path
        } else {
            return FsTools.GetPlatformPath(`Images/Previews/${this.type}-Preview.png`)
        }
    }

    GetFolderPath(): string {
        return FsTools.GetPathInProject(this.parent_project_uid, `/Assets/${this.uid}/`)
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

export class ProjectSerializationContext {
    project_uid = ""
    project_path = ""
}

export class AssetData {

    uid = ""
    subtype = ""
    _project_uid = ""
    _project_path = ""

    ToJson() {
        return {
            uid: this.uid,
            subtype: this.subtype
        }
    }

    FromJson(context: ProjectSerializationContext, data: any) {

        this._project_uid = context.project_uid
        this._project_path = context.project_path

        this.uid = data.uid ?? ""
        this.subtype = data.subtype ?? ""

    }

    GetPreviewPath(): string {
        return `${this._project_path}Assets/${this.uid}/Preview.png`
    }

}
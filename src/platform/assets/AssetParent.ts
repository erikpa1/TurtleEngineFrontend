import FsTools from "@api/FsTools";
import {AssetConstants} from "@platform/assets/AssetConstants";

export default class AssetParent {

    public relativePath = ""

    public uid = ""
    public parent_project_uid = ""
    public parent_project_path = ""
    public name = ""
    public description = ""
    public extension = ""
    public subtype = ""
    public _folder = ""

    static LANG = "asset"
    static LANG_PLURAL = "assets"

    GetPreviewPath(): string {
        return `${this.parent_project_path}${this._folder}/${this.uid}/Preview.png`

    }

    GetFolderPath(): string {
        return `${this.parent_project_path}${this._folder}/${this.uid}/`
    }

    FromJson(jObject: any) {
        this.uid = jObject.uid ?? ""
        this.name = jObject.name ?? ""
        this.description = jObject.description ?? ""
        this.extension = jObject.extension ?? ""
        this.subtype = jObject.subtype ?? ""
    }


}

export class AssetParentData {
    ToJson(): any {
        return {}
    }
}
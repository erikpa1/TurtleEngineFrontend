import {AssetData} from "@platform/assets/Asset.ts";
import FsTools from "@api/FsTools.ts";

export class MeshAssetData extends AssetData {


    mesh_extension = ""


    constructor() {
        super();
    }

    ToJson(): any {
        return {
            ...super.ToJson(),
            mesh_extension: this.mesh_extension

        }
    }

    FromJson(context: any, data: any) {
        super.FromJson(context, data)

        this.mesh_extension = data.mesh_extension ?? ""

    }


    GetEntryFile(): string {
        return FsTools.GetPathInProject(this._project_uid, `Assets/${this.uid}/Default.${this.mesh_extension}`)
    }

}
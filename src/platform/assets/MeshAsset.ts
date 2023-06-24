import AssetParent from "@platform/assets/AssetParent";


export default class MeshAsset extends AssetParent {
    static TYPE = "mesh"
    static FOLDER = "Meshes"
    static LANG = "core.mesh"
    static LANG_PLURAL = "core.meshes"
    static DEFAULT_PLATFORM_FILE = `Images/Previews/${MeshAsset.TYPE}-Preview.png`

    assetData: MeshAssetData

    constructor() {
        super();
        this.extension = "json"
        this.assetData = new MeshAssetData()
    }

    FromJson(jObject: any) {
        super.FromJson(jObject);
    }

    GetEntryFile(): string {
        console.log(`${this.parent_project_path}${MeshAsset.FOLDER}/${this.uid}/Default.glb`)
        return `${this.parent_project_path}${MeshAsset.FOLDER}/${this.uid}/Default.glb`
    }

}

class MeshAssetData {

    uid: string
    parent_project_uid: string
    meshExtension: string

    constructor() {
        this.meshExtension = ""
        this.uid = ""
        this.parent_project_uid = ""
    }


}
import AssetParent from "./AssetParent";

export default class AreaAsset extends AssetParent {
    static FOLDER = "Areas"
    static TYPE = "area"
    static LANG = "area"
    static LANG_PLURAL = "areas"
    static DEFAULT_PLATFORM_FILE = `Images/Previews/${AreaAsset.TYPE}-Preview.png`

    GetMaximapPath(): string {
        return `${this.parent_project_path}${AreaAsset.FOLDER}/${this.uid}/Default.jpg`

    }
}
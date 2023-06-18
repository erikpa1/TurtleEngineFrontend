import AssetParent from "./AssetParent";

export default class AreaAsset extends AssetParent {
    static FOLDER = "Areas"
    static TYPE = "area"
    static LANG = "core.area"
    static LANG_PLURAL = "core.areas"
    static DEFAULT_PLATFORM_FILE = `Images/Previews/${AreaAsset.TYPE}-Preview.png`
}
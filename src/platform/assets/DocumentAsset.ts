import AssetParent from "./AssetParent";

export default class DocumentAsset extends AssetParent {
    static TYPE = "document"
    static FOLDER = "Documents"
    static LANG = "document"
    static LANG_PLURAL = "document"
    static DEFAULT_PLATFORM_FILE = `Images/Previews/${DocumentAsset.TYPE}-Preview.png`
}
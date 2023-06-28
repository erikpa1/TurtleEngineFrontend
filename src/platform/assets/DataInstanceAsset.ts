import AssetParent from "./AssetParent";

export default class DataInstanceAsset extends AssetParent {
    static FOLDER = "DataInstance"
    static TYPE = "datainstance"
    static LANG = "datainstance"
    static LANG_PLURAL = "datainstances"
    static DEFAULT_PLATFORM_FILE = `Images/Previews/${DataInstanceAsset.TYPE}-Preview.png`


}
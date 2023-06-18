import AssetParent from "./AssetParent";

export default class VideoAsset extends AssetParent {
    static TYPE = "video"
    static FOLDER = "Videos"
    static LANG = "core.video"
    static LANG_PLURAL = "core.videos"
    static DEFAULT_PLATFORM_FILE = `Images/Previews/${VideoAsset.TYPE}-Preview.png`
}
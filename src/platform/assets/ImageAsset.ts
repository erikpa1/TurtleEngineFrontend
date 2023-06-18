import AssetParent from "./AssetParent";

export default class ImageAsset extends AssetParent {
    static TYPE = "image"
    static FOLDER = "Images"
    static LANG = "core.image"
    static LANG_PLURAL = "core.images"
    static DEFAULT_PLATFORM_FILE = `Images/Previews/${ImageAsset.TYPE}-Preview.png`
}
import AssetParent from "./AssetParent";

export default class SoundAsset extends AssetParent {
    static TYPE = "sound"
    static FOLDER = "Sounds"
    static LANG = "sound"
    static LANG_PLURAL = "souns"
    static DEFAULT_PLATFORM_FILE = `Images/Previews/${SoundAsset.TYPE}-Preview.png`
}
import AssetParent from "./AssetParent";

export default class FontAsset extends AssetParent {
    static TYPE = "font"
    static FOLDER = "Fonts"
    static LANG = "core.font"
    static LANG_PLURAL = "core.fonts"
    static DEFAULT_PLATFORM_FILE = `Images/Previews/${FontAsset.TYPE}-Preview.png`
}
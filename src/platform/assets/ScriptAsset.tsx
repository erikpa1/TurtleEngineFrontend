import AssetParent from "./AssetParent";

export default class ScriptAsset extends AssetParent {
    static TYPE = "script"
    static FOLDER = "Scripts"
    static LANG = "script"
    static LANG_PLURAL = "scripts"
    static DEFAULT_PLATFORM_FILE = `Images/Previews/${ScriptAsset.TYPE}-Preview.png`
}
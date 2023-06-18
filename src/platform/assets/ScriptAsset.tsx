import AssetParent from "./AssetParent";

export default class ScriptAsset extends AssetParent {
    static TYPE = "script"
    static FOLDER = "Scripts"
    static LANG = "core.script"
    static LANG_PLURAL = "core.scripts"
    static DEFAULT_PLATFORM_FILE = `Images/Previews/${ScriptAsset.TYPE}-Preview.png`
}
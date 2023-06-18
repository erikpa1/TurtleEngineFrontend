import AssetParent from "@platform/assets/AssetParent";


export default class MaterialAsset extends AssetParent {
    static TYPE = "material"
    static FOLDER = "Materials"
    static LANG = "core.material"
    static LANG_PLURAL = "core.materials"
    static DEFAULT_PLATFORM_FILE = `Images/Previews/${MaterialAsset.TYPE}-Preview.png`

}
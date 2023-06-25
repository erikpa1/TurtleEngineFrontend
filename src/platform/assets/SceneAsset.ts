import AssetParent from "./AssetParent";

export default class SceneAsset extends AssetParent {
    static TYPE = "scene"
    static FOLDER = "Scenes"
    static LANG = "scene-editor"
    static LANG_PLURAL = "scenes"
    static DEFAULT_PLATFORM_FILE = `Images/Previews/${SceneAsset.TYPE}-Preview.png`
}

export class SceneAssetData {

    light_intensity = 1

    constructor() {
        //pass
    }

    from_json(jObject: any | SceneAssetData) {

    }

    to_json(jObject: any | SceneAssetData) {

    }
}
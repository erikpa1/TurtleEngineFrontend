import AssetParent from "./AssetParent";

export default class SceneAsset extends AssetParent {
    static TYPE = "scene"
    static FOLDER = "Scenes"
    static LANG = "core.scene-editor"
    static LANG_PLURAL = "core.scenes"
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
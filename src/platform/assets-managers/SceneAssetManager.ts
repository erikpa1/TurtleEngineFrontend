import AssetsApi from "@api/AssetsApi";

import Asset from "@platform/assets/Asset";
import VirtualSceneDefinition from "@platform/assets/scenes/VirtualSceneDefinition";
import PanoramaSceneDefinition from "@platform/assets/scenes/PanoramaSceneDefinition";
import SceneDefinition from "@platform/assets/scenes/SceneDefinition";

export default class SceneAssetManager {

    static async CreateSceneAsset(asset: Asset) {

        await AssetsApi.CreateAssetFromLight(asset)

        let assetData: any = null

        if (asset.subtype === "virtual") {
            assetData = new VirtualSceneDefinition()
        } else if (asset.subtype === "panorama") {
            assetData = new PanoramaSceneDefinition()
        } else {
            assetData = new SceneDefinition()
        }

        assetData.uid = asset.uid
        assetData.subtype = asset.subtype

        await AssetsApi.UploadAssetData(asset.parent_project_uid, asset.uid, assetData.ToJson())


    }


}
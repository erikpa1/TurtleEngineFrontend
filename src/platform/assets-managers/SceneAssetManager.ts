import AssetsApi from "@api/AssetsApi.ts";

import Asset from "@platform/assets/Asset.ts";
import VirtualSceneDefinition from "@platform/assets/scenes/VirtualSceneDefinition.ts";
import PanoramaSceneDefinition from "@platform/assets/scenes/PanoramaSceneDefinition.ts";
import SceneDefinition from "@platform/assets/scenes/SceneDefinition.ts";

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
import AssetsApi from "@api/AssetsApi.ts";

import Asset from "@platform/assets/Asset.ts";
import {VirtualSceneData} from "@platform/assets/scene.ts";

export default class SceneAssetManager {

    static async CreateSceneAsset(asset: Asset) {

        await AssetsApi.CreateAssetFromLight(asset)

        const assetData = new VirtualSceneData()
        assetData.uid = asset.uid
        assetData.subtype = asset.subtype


        await AssetsApi.UploadAssetData(asset.parent_project_uid, asset.uid, assetData.ToJson())


    }


}
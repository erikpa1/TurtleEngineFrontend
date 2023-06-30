import {CreateAssetParamas} from "@api/project/params.ts";
import {UploadAssetFileParams} from "@editors/appmanagement/assets/CreateParams.ts";
import AssetParentManager from "@platform/assets-managers/AssetParentManager.ts";
import AssetsApi from "@api/AssetsApi.ts";
import {CreateThumbnailParams} from "@api/AssetApiParams.ts";
import FsTools from "@api/FsTools.ts";
import AssetParentLight from "@platform/assets/AssetParentLight.ts";
import {SceneAssetData} from "@platform/assets/SceneAsset.ts";

export default class SceneAssetManager {

    static async CreateSceneAsset(asset: AssetParentLight) {

        await AssetsApi.CreateAssetFromLight(asset)
        await AssetsApi.UploadAssetLight(asset)

    }


}
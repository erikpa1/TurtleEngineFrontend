import AssetParentManager from "@platform/assets-managers/AssetParentManager";
import AssetsApi from "@api/AssetsApi";

import {CreateAssetParamas} from "@api/project/params";
import {UploadAssetFileParams} from "@editors/appmanagement/assets/CreateParams";

import QuizData from "@platform/assets/quiz";


export default class QuizAssetManager {

    static async CreateQuizAsset(assetParams: CreateAssetParamas, uploadFileParams: UploadAssetFileParams) {

        const createdAsset = await AssetParentManager.CreateAsset(assetParams);

        uploadFileParams.asset_uid = createdAsset.uid

        await AssetParentManager.CreateAssetThumbnail(createdAsset, uploadFileParams)

        createdAsset.hasPreview = true

        await AssetsApi.UploadAssetLight(createdAsset)
        await AssetsApi.UploadAssetData(createdAsset.parent_project_uid, createdAsset.uid, new QuizData().ToJson())

    }

    static async ReplacePanorama(newPanoramaPath: string, oldPanoramaPath: string) {
        alert("ReplacePanorama Unimplemented")
    }

}
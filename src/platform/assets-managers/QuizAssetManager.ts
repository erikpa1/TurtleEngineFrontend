import {CreateAssetParamas} from "@api/project/params";
import {UploadAssetFileParams} from "@editors/appmanagement/assets/CreateParams";
import AssetParentManager from "@platform/assets-managers/AssetParentManager";
import AssetsApi from "@api/AssetsApi";
import {CreateThumbnailParams} from "@api/AssetApiParams";
import FsTools from "@api/FsTools";
import {QuizAssetData} from "@platform/assets/QuizAsset";
import {Assets} from "@platform/assets/Assets";


export default class QuizAssetManager {


    static async CreateQuizAsset(assetParams: CreateAssetParamas, uploadFileParams: UploadAssetFileParams) {

        const createdAsset = await AssetParentManager.CreateAsset(assetParams);


        uploadFileParams.asset_uid = createdAsset.uid

        const thumbnailParams = new CreateThumbnailParams()
        thumbnailParams.source_file = uploadFileParams.path_from
        thumbnailParams.destination_file = FsTools.GetPathInProject(uploadFileParams.project_uid, `${Assets.Quiz.FOLDER}/${createdAsset.uid}/Preview.png`)
        thumbnailParams.maxWidth = 256

        //Vytvorenie thumbnailu
        await AssetsApi.CreateAssetThumbnail(thumbnailParams)

        createdAsset.hasPreview = true

        await AssetsApi.UploadAssetLight(createdAsset)

        await AssetsApi.UploadAssetData(createdAsset, new QuizAssetData())

    }

    static async ReplacePanorama(newPanoramaPath: string, oldPanoramaPath: string) {
        alert("ReplacePanorama Unimplemented")
    }

}
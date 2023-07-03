import {CreateAssetParamas} from "@api/project/params";
import {UploadAssetFileParams} from "@editors/appmanagement/assets/CreateParams";
import AssetParentManager from "@platform/assets-managers/AssetParentManager";
import AssetsApi from "@api/AssetsApi";
import {CreateThumbnailParams} from "@api/AssetApiParams";
import FsTools from "@api/FsTools";
import ImagesApi from "@api/ImagesApi";


export default class PanoramaAssetManager {


    static async CreatePanoramaAsset(assetParams: CreateAssetParamas, uploadFileParams: UploadAssetFileParams) {

        const createdAsset = await AssetParentManager.CreateAsset(assetParams);


        uploadFileParams.asset_uid = createdAsset.uid

        //Update assetoveho obrazka
        const destinationFile = await AssetsApi.UpdateAssetFile(uploadFileParams)

        const destination = FsTools.ReplaceFileNameAndExtension(destinationFile, "Preview.png")
        //Vytvorenie thumbnailu
        await ImagesApi.GeneratePreviewDesktop(destinationFile, destination, 256 )

        createdAsset.hasPreview = true

        //Uploadnutie assetu v databaze
        await AssetsApi.UploadAssetLight(createdAsset)

    }

    static async ReplacePanorama(newPanoramaPath: string, oldPanoramaPath: string) {
        alert("ReplacePanorama Unimplemented")
    }

}
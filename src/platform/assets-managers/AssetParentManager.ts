import AssetsApi from "@api/AssetsApi";
import {CreateAssetParamas} from "@api/project/params";
import Asset from "@platform/assets/Asset";
import {UploadAssetFileParams} from "@editors/appmanagement/assets/CreateParams";
import {CreateThumbnailParams} from "@api/AssetApiParams";
import FsTools from "@api/FsTools";
import ImagesApi from "@api/ImagesApi";

export default class AssetParentManager {
    static async CreateAsset(params: CreateAssetParamas): Promise<Asset> {
        return await AssetsApi.CreateAsset(params)
    }

    static async CreateAssetThumbnail(basicParams: Asset, uploadFileParams: UploadAssetFileParams) {
        const destination = FsTools.GetPathInProject(basicParams.parent_project_uid, `Assets/${basicParams.uid}/Preview.png`)
        //Vytvorenie thumbnailu
        await ImagesApi.GeneratePreviewDesktop(uploadFileParams.path_from, destination, 256)

    }

}
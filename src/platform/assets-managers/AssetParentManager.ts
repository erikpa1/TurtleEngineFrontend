import AssetsApi from "@api/AssetsApi";
import {CreateAssetParamas} from "@api/project/params";
import Asset from "@platform/assets/Asset.ts";
import {UploadAssetFileParams} from "@editors/appmanagement/assets/CreateParams";
import {CreateThumbnailParams} from "@api/AssetApiParams";
import FsTools from "@api/FsTools";

export default class AssetParentManager {
    static async CreateAsset(params: CreateAssetParamas): Promise<Asset> {
        return await AssetsApi.CreateAsset(params)
    }

    static async CreateAssetThumbnail(basicParams: Asset, uploadFileParams: UploadAssetFileParams) {

        const thumbnailParams = new CreateThumbnailParams()
        thumbnailParams.source_file = uploadFileParams.path_from
        thumbnailParams.destination_file = FsTools.GetPathInProject(basicParams.parent_project_uid, `Assets/${basicParams.uid}/Preview.png`)
        thumbnailParams.maxWidth = 256

        await AssetsApi.CreateAssetThumbnail(thumbnailParams)

    }

}
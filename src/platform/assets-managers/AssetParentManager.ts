import AssetsApi from "@api/AssetsApi";
import {CreateAssetParamas} from "@api/project/params";
import AssetParentLight from "@platform/assets/AssetParentLight";
import {UploadAssetFileParams} from "@editors/appmanagement/assets/CreateParams";
import {CreateThumbnailParams} from "@api/AssetApiParams";
import FsTools from "@api/FsTools";
import {Assets} from "@platform/assets/Assets";
import AssetParent from "@platform/assets/AssetParent";


export default class AssetParentManager {
    static async CreateAsset(params: CreateAssetParamas): Promise<AssetParentLight> {
        return await AssetsApi.CreateAsset(params)
    }

    static async CreateAssetThumbnail(basicParams: AssetParentLight, folder: string, uploadFileParams: UploadAssetFileParams) {

        const thumbnailParams = new CreateThumbnailParams()
        thumbnailParams.source_file = uploadFileParams.path_from
        thumbnailParams.destination_file = FsTools.GetPathInProject(basicParams.parent_project_uid, `${folder}/${basicParams.uid}/Preview.png`)
        thumbnailParams.maxWidth = 256

        await AssetsApi.CreateAssetThumbnail(thumbnailParams)

    }

}
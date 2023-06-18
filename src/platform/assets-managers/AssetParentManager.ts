import AssetsApi from "@api/AssetsApi";
import {CreateAssetParamas} from "@api/project/params";
import AssetParentLight from "@platform/assets/AssetParentLight";


export default class AssetParentManager {
    static async CreateAsset(params: CreateAssetParamas): Promise<AssetParentLight> {
        return await AssetsApi.CreateAsset(params)
    }
}
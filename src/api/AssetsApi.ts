import AssetParent from "@platform/assets/AssetParent";
import ApiDispatcher from "@api/ApiDispatcher";
import {CreateAssetParamas} from "@api/project/params";
import axios from "axios";
import TauriAssetPlugin from "../tauri/plugin_assets";

export default class AssetsApi {


    static async GetAllAssetsOfType(projectUid: string, assetType: string): Promise<Array<AssetParent>> {

        if (ApiDispatcher.IsDesktop()) {
            const tmp = [0, 1, 2, 3].map((value) => {
                const asset = new AssetParent()
                asset.name = `${assetType}-${value}`
                asset.uid = `tmp-${assetType}-${value}`
                asset.relativePath = `/dev/assets/${assetType}/tmp-${assetType}/Preview.png`
                asset.description = "This asset is for"
                return asset
            })

            return [...tmp]

        } else {
            return []
        }

    }

    static async CreateAsset(params: CreateAssetParamas): Promise<boolean> {

        if (ApiDispatcher.IsDesktop()) {
            await TauriAssetPlugin.CreateAsset(params);

        } else {
            await axios.post("/api/assets/create-asset", params) //TODO Implement this one
        }
        return true

    }


}
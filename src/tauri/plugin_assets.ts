import {invoke} from "@tauri-apps/api/tauri";

import AssetParent from "@platform/assets/AssetParent";
import {CreateAssetParamas} from "@api/project/params";

export const ASSETS_PLUGIN_NAME = "plugin:turtle_assets|"


export default class TauriAssetPlugin {
    static async GetAllAssetsOfType(projectUid: string, assetType: string): Promise<Array<AssetParent>> {
        const response = await invoke<string>(`${ASSETS_PLUGIN_NAME}GetAllAssetsOfType`, {
            projectUid: projectUid,
            assetType: assetType
        })

        return []

    }

    static async CreateAsset(params: CreateAssetParamas): Promise<boolean> {
        console.log(params)
        await invoke<string>(`${ASSETS_PLUGIN_NAME}CreateAsset`, {
            createJson: JSON.stringify(params),
        })
        return true
    }


}
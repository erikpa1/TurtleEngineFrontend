import {invoke} from "@tauri-apps/api/tauri";

import {ProjectLight} from "@data/project/ProjectLight";
import AssetParent from "@platform/assets/AssetParent";
import {CreateAssetParamas} from "@api/project/params";

export const PROJECTS_PLUGIN_NAME = "plugin:turtle_assets|"


export default class TauriAssetPlugin {
    static async GetAllAssetsOfType(projectUid: string, assetType: string): Promise<Array<AssetParent>> {
        await invoke<string>(`${PROJECTS_PLUGIN_NAME}GetAllAssetsOfType`, {
            project_uid: projectUid,
            asset_type: assetType
        })

        return []

    }

    static async CreateAsset(params: CreateAssetParamas): Promise<boolean> {
        await invoke<string>(`${PROJECTS_PLUGIN_NAME}CreateAsset`, {
            createJson: JSON.stringify(params),
        })
        return true
    }


}
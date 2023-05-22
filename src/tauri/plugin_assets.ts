import {invoke} from "@tauri-apps/api/tauri";

import {ProjectLight} from "@data/project/ProjectLight";
import AssetParent from "@platform/assets/AssetParent";

export const PROJECTS_PLUGIN_NAME = "plugin:turtle_assets|"


export default class TauriAssetPlugin {
    async GetAllAssetsOfType(projectUid: string, assetType: string): Promise<Array<AssetParent>> {


        return []

    }

}
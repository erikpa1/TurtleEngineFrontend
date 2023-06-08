import {invoke} from "@tauri-apps/api/tauri";

import {CreateAssetParamas} from "@api/project/params";

import AssetParentLight from "@platform/assets/AssetParentLight";

export const ASSETS_PLUGIN_NAME = "plugin:turtle_assets|"


export default class TauriAssetPlugin {
    static async GetAllAssetsOfType(projectUid: string, assetType: string): Promise<Array<AssetParentLight>> {
        const response = await invoke<string>(`${ASSETS_PLUGIN_NAME}GetAllAssetsOfType`, {
            projectUid: projectUid,
            assetType: assetType
        })

        const responseJson = JSON.parse(response)

        const returnValue = responseJson.assets.map((value: any) => {
            const tmp = new AssetParentLight()
            tmp.from_json(value)
            tmp.parent_project_uid = projectUid

            return tmp
        })

        return returnValue

    }

    static async CreateAsset(params: CreateAssetParamas): Promise<boolean> {

        await invoke<string>(`${ASSETS_PLUGIN_NAME}CreateAsset`, {
            createJson: JSON.stringify(params),
        })
        return true
    }

    static async DeleteAssetWithUid(project_uid: string, asset_uid: string): Promise<boolean> {

        const response = await invoke<string>(`${ASSETS_PLUGIN_NAME}DeleteAssetWithUid`, {
            projectUid: project_uid,
            assetUid: asset_uid
        })

        return true
    }

    static async GetAsset(project_uid: string, asset_uid: string): Promise<any> {

        const response = await invoke<string>(`${ASSETS_PLUGIN_NAME}GetAsset`, {
            projectUid: project_uid,
            assetUid: asset_uid
        })

        return JSON.parse(response)
    }

}
import {invoke} from "@tauri-apps/api/tauri";

import {CreateAssetParamas} from "@api/project/params";

import AssetParentLight from "@platform/assets/AssetParentLight";
import {UploadAssetFileParams} from "@editors/appmanagement/assets/CreateParams";
import TauriSqlitePlugin from "./plugin_sqlite";
import FsTools from "@api/FsTools";
import AssetParent, {AssetParentData} from "@platform/assets/AssetParent";
import TauriOsPlugin from "./plugin_os";
import AssetParentManager from "@platform/assets-managers/AssetParentManager";

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

    static async CreateAsset(params: CreateAssetParamas): Promise<AssetParentLight> {

        params.uid = crypto.randomUUID()


        const QUERY = `INSERT INTO Assets (Uid, Name, Type, Extension)
                       VALUES ('${params.uid}', '${params.name}', '${params.assetType}', '${params.extension}');`

        const response = await TauriSqlitePlugin.Exec(QUERY)

        console.log(response)

        const asset = new AssetParentLight()
        asset.parent_project_uid = params.project_uid
        asset.uid = params.uid
        asset.name = params.name

        await TauriOsPlugin.WriteFileString(
            FsTools.GetPathInProject(params.project_uid, `${params.assetDefinition.FOLDER}/${params.uid}/Default.json`),
            JSON.stringify(asset)
        )

        return asset
    }

    static async DeleteAssetWithUid(project_uid: string, asset_uid: string): Promise<boolean> {

        const response = await invoke<string>(`${ASSETS_PLUGIN_NAME}DeleteAssetWithUid`, {
            projectUid: project_uid,
            assetUid: asset_uid
        })

        return true
    }

    static async GetAsset(project_uid: string, asset_type: string, asset_uid: string): Promise<any> {

        const response = await invoke<string>(`${ASSETS_PLUGIN_NAME}GetAsset`, {
            projectUid: project_uid,
            assetUid: asset_uid,
            assetType: asset_type
        })

        return JSON.parse(response)
    }

    static async UploadAssetFile(params: UploadAssetFileParams): Promise<string> {
        const filePath = await invoke<string>(`${ASSETS_PLUGIN_NAME}UploadAssetFile`, {
            createJson: JSON.stringify(params),
        })
        return FsTools.NormalizePath(filePath)

    }

    static async CreateAssetThumbnail(params: UploadAssetFileParams): Promise<boolean> {
        await invoke<string>(`${ASSETS_PLUGIN_NAME}CreateAssetThumbnail`, {
            createJson: JSON.stringify(params),
        })
        return true
    }

    static async UploadAssetLight(assetLight: AssetParentLight): Promise<boolean> {

        const hasPreview = assetLight.hasPreview ? 1 : 0

        await TauriSqlitePlugin.Exec(`UPDATE Assets
                                      SET Name='${assetLight.name}',
                                          HasPreview=${hasPreview}
                                      WHERE Uid = '${assetLight.uid}';`)
        return true
    }

    static async UploadAssetData(asset: AssetParentLight, assetLight: AssetParentData): Promise<boolean> {
        await TauriOsPlugin.WriteFileString(`${asset.GetFolderPath()}Default.json`, JSON.stringify(assetLight.ToJson()))
        return true
    }


}
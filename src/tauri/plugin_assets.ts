import {invoke} from "@tauri-apps/api/tauri";

import {CreateAssetParamas} from "@api/project/params";

import Asset from "@platform/assets/Asset.ts";
import {UploadAssetFileParams} from "@editors/appmanagement/assets/CreateParams";
import TauriSqlitePlugin from "./plugin_sqlite";
import FsTools from "@api/FsTools";

import TauriOsPlugin from "./plugin_os";


export const ASSETS_PLUGIN_NAME = "plugin:turtle_assets|"


export default class TauriAssetPlugin {
    static async GetAllAssetsOfType(projectUid: string, assetType: string): Promise<Array<Asset>> {
        const response = await invoke<string>(`${ASSETS_PLUGIN_NAME}GetAllAssetsOfType`, {
            projectUid: projectUid,
            assetType: assetType
        })

        const responseJson = JSON.parse(response)

        const returnValue = responseJson.assets.map((value: any) => {
            const tmp = new Asset()
            tmp.from_json(value)
            tmp.parent_project_uid = projectUid

            return tmp
        })

        return returnValue

    }

    static async CreateAsset(params: CreateAssetParamas): Promise<Asset> {

        params.uid = `${params.assetType}-${crypto.randomUUID()}`

        const QUERY = `INSERT INTO Assets (Uid, Name, Type, Extension)
                       VALUES ('${params.uid}', '${params.name}', '${params.assetType}', '${params.extension}');`

        const response = await TauriSqlitePlugin.Exec(QUERY)

        const asset = new Asset()
        asset.parent_project_uid = params.project_uid
        asset.uid = params.uid
        asset.name = params.name

        await TauriOsPlugin.WriteFileString(
            FsTools.GetPathInProject(params.project_uid, `Assets/${params.uid}/Default.json`),
            JSON.stringify(asset)
        )

        return asset
    }

    static async CreateAssetFromLight(asset: Asset): Promise<string> {

        asset.uid = `${asset.type}-${crypto.randomUUID()}`

        const QUERY = `INSERT INTO Assets (Uid, Name, Type, SubType, Extension)
                       VALUES ('${asset.uid}', '${asset.name}', '${asset.type}', '${asset.subtype}',
                               '${"json"}');`

        const response = await TauriSqlitePlugin.Exec(QUERY)


        return asset.uid
    }

    static async UpdateAssetData(project_uid: string, asset_uid: string, data: any) {

        await TauriOsPlugin.WriteFileString(
            FsTools.GetPathInProject(project_uid, `Assets/${asset_uid}/Default.json`),
            JSON.stringify(data)
        )



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

    static async GetAssetData(project_uid: string, asset_uid: string): Promise<any> {

        const dataJsonPath = `Assets/${asset_uid}/Default.json`

        const response = await TauriOsPlugin.ReadFileString(FsTools.GetPathInProject(project_uid, dataJsonPath)).catch((err) => {
            console.error(`Unable to get asset data of: <${asset_uid}> because of ${err}`)
            return "{}"
        })

        if (response === "404") {
            return {}
        } else {
            return JSON.parse(response)

        }

    }

    static async UploadAssetFile(params: UploadAssetFileParams): Promise<string> {
        console.log(params)
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

    static async UploadAssetLight(assetLight: Asset): Promise<boolean> {

        const hasPreview = assetLight.hasPreview ? 1 : 0

        await TauriSqlitePlugin.Exec(`UPDATE Assets
                                      SET Name='${assetLight.name}',
                                          HasPreview=${hasPreview}
                                      WHERE Uid = '${assetLight.uid}';`)
        return true
    }



}
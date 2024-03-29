import axios from "axios";

import Asset, {AssetData, ProjectSerializationContext} from "@platform/assets/Asset";
import PlatformDispatcher from "@api/PlatformDispatcher";
import {CreateAssetParamas} from "@api/project/params";

import TauriAssetPlugin from "../tauri/plugin_assets";
import {useActiveProjectZus} from "@platform/zustands/projectZuses";
import {UploadAssetFileParams} from "@editors/appmanagement/assets/CreateParams";
import TauriOsPlugin from "../tauri/plugin_os";
import TauriSqlitePlugin from "../tauri/plugin_sqlite";

export default class AssetsApi {

    static async GetAllAssetsOfType(projectUid: string, assetType: string): Promise<Array<Asset>> {
        if (PlatformDispatcher.IsDesktop()) {
            const assets = await TauriAssetPlugin.GetAllAssetsOfType(projectUid, assetType)
            return assets
        } else {
            return []
        }
    }

    static async GetAllAssets(projectUid: string): Promise<Array<Asset>> {
        if (PlatformDispatcher.IsDesktop()) {
            const assets = await TauriAssetPlugin.GetAllAssets(projectUid)
            return assets
        } else {
            return []
        }
    }

    static async GetAsset(projectUid: string, assetUid: string): Promise<Asset> {
        if (PlatformDispatcher.IsDesktop()) {
            const asset = await TauriAssetPlugin.GetAsset(projectUid, assetUid)
            return asset
        } else {
            return new Asset()
        }

    }

    static async UpdateAsset(asset: Asset) {

        if (PlatformDispatcher.IsDesktop()) {
            const query = `UPDATE Assets
                           Set Name='${asset.name}',
                               Description='${asset.description}',
                               Tags='${asset.tags}'
                           WHERE Uid = '${asset.uid}'`
            await TauriSqlitePlugin.Exec(query)
        } else {
            await axios.put("/api/assets/update-asset", null, {
                params: asset.ToJson()
            })
        }
    }

    static async CreateAsset(params: CreateAssetParamas): Promise<Asset> {
        if (PlatformDispatcher.IsDesktop()) {
            return await TauriAssetPlugin.CreateAsset(params);
        } else {
            await axios.post("/api/assets/create-asset", params) //TODO Implement this one
        }
        alert("Create asset is not implemented for web")
        return new Asset()
    }

    static async CreateAssetFromLight(params: Asset) {
        if (PlatformDispatcher.IsDesktop()) {
            await TauriAssetPlugin.CreateAssetFromLight(params);
        } else {
            await axios.post("/api/assets/create-asset", params) //TODO Implement this one
        }
    }

    static async CopyAssetFileDesktop(fromPath: string, toPath: string): Promise<boolean> {
        await TauriOsPlugin.CopyFile(fromPath, toPath)
        return true
    }

    static async UpdateAssetFile(params: UploadAssetFileParams): Promise<string> {
        if (PlatformDispatcher.IsDesktop()) {
            return await TauriAssetPlugin.UploadAssetFile(params);
        } else {
            await axios.post("/api/assets/upload-asset-file", params) //TODO Implement this one
        }
        return ""
    }


    static async DeleteAssetWithUid(asset: Asset): Promise<boolean> {
        if (PlatformDispatcher.IsDesktop()) {
            await TauriAssetPlugin.DeleteAssetWithUid(asset.parent_project_uid, asset.uid);
            await TauriOsPlugin.DeleteFolder(asset.GetFolderPath());
        } else {
            await axios.post("/api/assets/create-asset") //TODO Implement this one
        }
        return true
    }

    static async UploadAssetLight(assetLight: Asset): Promise<boolean> {
        if (PlatformDispatcher.IsDesktop()) {
            await TauriAssetPlugin.UploadAssetLight(assetLight);
        } else {
            await axios.post("/api/assets/upload-asset") //TODO Implement this one
        }
        return true
    }

    //Je jedno akeho su data typu
    static async UploadAssetData(project_uid: string, asset_uid: string, assetParentData: any): Promise<boolean> {
        const toUpload = assetParentData instanceof AssetData ? assetParentData.ToJson() : assetParentData

        if (PlatformDispatcher.IsDesktop()) {
            await TauriAssetPlugin.UpdateAssetData(project_uid, asset_uid, toUpload);
        } else {
            await axios.post("/api/assets/create-asset") //TODO Implement this one
        }
        return true
    }

    static async GetAssetData<T extends AssetData>(clazz: any, project_uid: string, asset_uid: string): Promise<T> {

        const asset: any | AssetData = new clazz()

        const context = new ProjectSerializationContext()
        context.project_uid = project_uid
        context.project_path = useActiveProjectZus.getState().project.projectFolderPath

        let data = {}

        if (PlatformDispatcher.IsDesktop()) {
            data = await TauriAssetPlugin.GetAssetData(project_uid, asset_uid);
        } else {
            data = await axios.get("/api/assets/get-asset", {
                params: {
                    project_uid: project_uid,
                    asset_uid: asset_uid
                }
            })
        }
        asset.FromJson(context, data)

        return asset as any
    }

    static async GetAssetAndAssetData(clazz: any, project_uid: string, asset_uid: string): Promise<Asset> {

        const asset = await AssetsApi.GetAsset(project_uid, asset_uid)
        const data = await AssetsApi.GetAssetData<any>(clazz, project_uid, asset_uid)

        asset.data = data

        return asset


    }

}
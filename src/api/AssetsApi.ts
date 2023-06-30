import axios from "axios";

import AssetParent, {AssetParentData} from "@platform/assets/AssetParent";
import PlatformDispatcher from "@api/PlatformDispatcher";
import {CreateAssetParamas} from "@api/project/params";

import TauriAssetPlugin from "../tauri/plugin_assets";

import AssetParentLight from "@platform/assets/AssetParentLight";
import {useActiveProjectZus} from "@platform/zustands/projectZuses";
import {UploadAssetFileParams} from "@editors/appmanagement/assets/CreateParams";
import {CreateThumbnailParams} from "@api/AssetApiParams";
import TauriOsPlugin from "../tauri/plugin_os";
import {AssetDefinition} from "@platform/assets/Assets";

export default class AssetsApi {


    static async GetAllAssetsOfType(projectUid: string, assetType: string): Promise<Array<AssetParentLight>> {

        if (PlatformDispatcher.IsDesktop()) {
            const assets = await TauriAssetPlugin.GetAllAssetsOfType(projectUid, assetType)
            return assets
        } else {
            return []
        }

    }

    static async CreateAsset(params: CreateAssetParamas): Promise<AssetParentLight> {
        if (PlatformDispatcher.IsDesktop()) {
            return await TauriAssetPlugin.CreateAsset(params);
        } else {
            await axios.post("/api/assets/create-asset", params) //TODO Implement this one
        }
        alert("Create asset is not implemented for web")
        return new AssetParentLight()
    }

    static async CreateAssetFromLight(params: AssetParentLight) {
        if (PlatformDispatcher.IsDesktop()) {
            await TauriAssetPlugin.CreateAssetFromLight(params);
        } else {
            await axios.post("/api/assets/create-asset", params) //TODO Implement this one
        }

    }


    static async UpdateAssetFile(params: UploadAssetFileParams): Promise<string> {
        if (PlatformDispatcher.IsDesktop()) {
            return await TauriAssetPlugin.UploadAssetFile(params);
        } else {
            await axios.post("/api/assets/upload-asset-file", params) //TODO Implement this one
        }
        return ""
    }

    static async CreateAssetThumbnail(params: CreateThumbnailParams): Promise<boolean> {
        if (PlatformDispatcher.IsDesktop()) {
            await TauriAssetPlugin.CreateAssetThumbnail(params);
        } else {
            await axios.post("/api/assets/upload-asset-file", params) //TODO Implement this one
        }
        return true
    }


    static async DeleteAssetWithUid(asset: AssetParentLight): Promise<boolean> {
        if (PlatformDispatcher.IsDesktop()) {
            await TauriAssetPlugin.DeleteAssetWithUid(asset.parent_project_uid, asset.uid);
            await TauriOsPlugin.DeleteFolder(asset.GetFolderPath());
        } else {
            await axios.post("/api/assets/create-asset") //TODO Implement this one
        }
        return true
    }

    static async UploadAssetLight(assetLight: AssetParentLight): Promise<boolean> {
        if (PlatformDispatcher.IsDesktop()) {
            await TauriAssetPlugin.UploadAssetLight(assetLight);
        } else {
            await axios.post("/api/assets/create-asset") //TODO Implement this one
        }
        return true
    }

    static async UploadAssetData(asset: AssetParentLight, assetParentData: AssetParentData): Promise<boolean> {
        if (PlatformDispatcher.IsDesktop()) {
            await TauriAssetPlugin.UploadAssetData(asset, assetParentData);
        } else {
            await axios.post("/api/assets/create-asset") //TODO Implement this one
        }
        return true
    }


    static async GetAssetData<T extends AssetParent>(assetDefinition: AssetDefinition, project_uid: string, asset_uid: string): Promise<T> {

        const asset: AssetParent = new assetDefinition.CLASS()

        if (PlatformDispatcher.IsDesktop()) {
            const data = await TauriAssetPlugin.GetAssetData(project_uid, assetDefinition, asset_uid);

            asset.FromJson(data)
            asset.parent_project_uid = project_uid
            asset.parent_project_path = useActiveProjectZus.getState().project.projectFolderPath
        } else {
            const data = await axios.get("/api/assets/get-asset", {
                params: {
                    project_uid: project_uid,
                    asset_uid: asset_uid
                }
            })
            asset.FromJson(data)
        }


        return asset as any

    }


}
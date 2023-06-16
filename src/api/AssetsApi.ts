import AssetParent from "@platform/assets/AssetParent";
import PlatformDispatcher from "@api/PlatformDispatcher";
import {CreateAssetParamas} from "@api/project/params";
import axios from "axios";
import TauriAssetPlugin from "../tauri/plugin_assets";
import FsApi from "@api/FsApi";
import AssetParentLight from "@platform/assets/AssetParentLight";

export default class AssetsApi {


    static async GetAllAssetsOfType(projectUid: string, assetType: string): Promise<Array<AssetParentLight>> {

        if (PlatformDispatcher.IsDesktop()) {

            const assets = await TauriAssetPlugin.GetAllAssetsOfType(projectUid, assetType)

            return assets

        } else {
            return []
        }

    }

    static async CreateAsset(params: CreateAssetParamas): Promise<boolean> {

        if (PlatformDispatcher.IsDesktop()) {
            await TauriAssetPlugin.CreateAsset(params);

        } else {
            await axios.post("/api/assets/create-asset", params) //TODO Implement this one
        }
        return true

    }

    static async DeleteAssetWithUid(project_uid: string, asset_uid: string): Promise<boolean> {

        if (PlatformDispatcher.IsDesktop()) {
            await TauriAssetPlugin.DeleteAssetWithUid(project_uid, asset_uid);

        } else {
            await axios.post("/api/assets/create-asset") //TODO Implement this one
        }
        return true

    }

    static async GetAsset<T extends AssetParent>(clazz: new () => T, project_uid: string, asset_uid: string): Promise<T> {

        const asset = new clazz()

        if (PlatformDispatcher.IsDesktop()) {
            const data = await TauriAssetPlugin.GetAsset(project_uid, asset_uid);
            asset.from_json(data)

        } else {
            const data = await axios.get("/api/assets/get-asset", {
                params: {
                    project_uid: project_uid,
                    asset_uid: asset_uid
                }
            })
            asset.from_json(data)
        }

        return asset

    }


}
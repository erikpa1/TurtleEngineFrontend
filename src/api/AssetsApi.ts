import AssetParent from "@platform/assets/AssetParent";
import ApiDispatcher from "@api/ApiDispatcher";
import {CreateAssetParamas} from "@api/project/params";
import axios from "axios";
import TauriAssetPlugin from "../tauri/plugin_assets";
import FsApi from "@api/FsApi";
import AssetParentLight from "@platform/assets/AssetParentLight";

export default class AssetsApi {


    static async GetAllAssetsOfType(projectUid: string, assetType: string): Promise<Array<AssetParentLight>> {

        if (ApiDispatcher.IsDesktop()) {
            const tmp = [0, 1, 2, 3].map((value) => {
                const asset = new AssetParentLight()
                asset.name = `${assetType}-${value}`
                asset.uid = `tmp-${assetType}-${value}`
                asset.relativePath = `/dev/assets/${assetType}/tmp-${assetType}/Preview.png`

                asset.description = "This asset is for"
                return asset
            })


            const assets = await TauriAssetPlugin.GetAllAssetsOfType(projectUid, assetType)

            return [...tmp, ...assets]

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

    static async DeleteAssetWithUid(project_uid: string, asset_uid: string): Promise<boolean> {

        if (ApiDispatcher.IsDesktop()) {
            await TauriAssetPlugin.DeleteAssetWithUid(project_uid, asset_uid);

        } else {
            await axios.post("/api/assets/create-asset") //TODO Implement this one
        }
        return true

    }

    static async GetAsset<T extends AssetParent>(clazz: new () => T, project_uid: string, asset_uid: string): Promise<T> {


        const asset = new clazz()

        if (ApiDispatcher.IsDesktop()) {
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
import React from "react";
import AssetParentLight from "@platform/assets/AssetParentLight";
import {useNavigate} from "react-router-dom";
import {Assets} from "@platform/assets/Assets";
import RoutesManager from "@platform/RoutesManager";


export default function useOpenAssetDispatcher(): (asset: AssetParentLight) => void {

    const navigate = useNavigate()
    const openAsset = (asset: AssetParentLight) => {

        console.log(asset)

        const projectUid = asset.parent_project_uid
        const assetUid = asset.uid

        if (asset.type === Assets.Material.TYPE) {
            navigate(RoutesManager.MaterialEditor(projectUid, assetUid))
        } else if (asset.type === Assets.Mesh.TYPE) {
            navigate(RoutesManager.MeshEditor(projectUid, assetUid))
        } else if (asset.type === Assets.PointCloud.TYPE) {
            navigate(RoutesManager.PointCloudEditor(projectUid, assetUid))
        } else if (asset.type === Assets.Panorama.TYPE) {
            navigate(RoutesManager.PanoramaEditor(projectUid, assetUid))
        } else if (asset.type === Assets.Scene.TYPE) {
            navigate(RoutesManager.SceneEditor(projectUid, assetUid))
        } else if (asset.type === Assets.Area.TYPE) {
            navigate(RoutesManager.AreaEditor(projectUid, assetUid))
        } else {
            alert(`No editor known for asset of type: ${asset.type}`)
        }
    }

    return openAsset

}
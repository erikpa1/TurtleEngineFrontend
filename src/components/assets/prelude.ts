import React from "react";
import AssetParentLight from "@platform/assets/AssetParentLight";
import {useNavigate} from "react-router-dom";
import {Assets} from "@platform/assets/Assets";
import RoutesManager from "@platform/RoutesManager";


export default function useOpenAssetDispatcher(): (asset: AssetParentLight) => void {

    const navigate = useNavigate()
    const openAsset = (asset: AssetParentLight) => {
        const projectUid = asset.parent_project_uid
        const assetUid = asset.uid
        const assetType = asset.type

        navigate(RoutesManager.GetAssetRoute(projectUid, assetType, assetUid))

    }

    return openAsset

}
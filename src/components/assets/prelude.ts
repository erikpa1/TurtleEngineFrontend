import React from "react";
import AssetParentLight from "@platform/assets/AssetParentLight";
import {useNavigate} from "react-router-dom";
import {Assets} from "@platform/assets/Assets";

export default function useOpenAssetDispatcher(): [(asset: AssetParentLight) => void] {

    const navigate = useNavigate()
    const openAsset = (asset: AssetParentLight) => {

        if (asset.assetType === Assets.Material.TYPE) {
            navigate(`/material-editor/${asset.parent_project_uid}/${asset.uid}`)
        } else {
            alert(`No editor known for asset of type: ${asset.assetType}`)
        }
    }


    return [openAsset]

}
import {AssetEditorHud} from "@components/assets/AssetEditorHud";
import HudButton from "@components/assets/HudButton";
import OpenAssetFolderButton from "@components/assets/OpenAssetFolderButton";
import React from "react";
import Asset from "@platform/assets/Asset";

interface PointCloudEditorHudProps {
    asset: Asset
}

export default function PointCloudEditorHud({asset}: PointCloudEditorHudProps) {
    return (
        <AssetEditorHud placement={"bottom"}>
            <OpenAssetFolderButton asset={asset}/>

            <HudButton
                lang={"replace"}
                icon={"/icons/Map.svg"}
            />
            <HudButton
                lang={"edit"}
                icon={"/icons/Management.svg"}
            />

        </AssetEditorHud>
    )
}
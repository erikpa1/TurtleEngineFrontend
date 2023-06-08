import {AssetEditorHud} from "@components/assets/AssetEditorHud";
import HudButton from "@components/assets/HudButton";
import OpenAssetFolderButton from "@components/assets/OpenAssetFolderButton";
import React from "react";

export default function PointCloudEditorHud({}) {
    return (
        <AssetEditorHud placement={"bottom"}>
            <OpenAssetFolderButton/>

            <HudButton
                lang={"core.replace"}
                icon={"/icons/Map.svg"}
            />
            <HudButton
                lang={"core.edit"}
                icon={"/icons/Management.svg"}
            />

        </AssetEditorHud>
    )
}
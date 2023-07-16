import React from "react";
import {AssetEditorHud} from "@components/assets/AssetEditorHud";
import HudButton from "@components/assets/HudButton";
import OpenAssetFolderButton from "@components/assets/OpenAssetFolderButton";

import PanoramaAsset from "@platform/assets/panorama";
import Asset from "@platform/assets/Asset";

interface PanoramaEditorHudProps {
    asset: Asset
}

export default function PanoramaEditorHud({asset}: PanoramaEditorHudProps) {


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
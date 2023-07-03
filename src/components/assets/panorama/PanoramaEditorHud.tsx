import React from "react";
import {AssetEditorHud} from "@components/assets/AssetEditorHud";
import HudButton from "@components/assets/HudButton";
import OpenAssetFolderButton from "@components/assets/OpenAssetFolderButton";

import PanoramaAsset from "@platform/assets/panorama";

interface PanoramaEditorHudProps {
    panorama: PanoramaAsset
}

export default function PanoramaEditorHud({panorama}: PanoramaEditorHudProps) {


    return (
        <AssetEditorHud placement={"bottom"}>

            <OpenAssetFolderButton asset={panorama}/>

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
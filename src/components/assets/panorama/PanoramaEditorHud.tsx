import React from "react";
import {AssetEditorHud} from "@components/assets/AssetEditorHud";
import HudButton from "@components/assets/HudButton";
import OpenAssetFolderButton from "@components/assets/OpenAssetFolderButton";

import PanoramaAsset from "@platform/assets/PanoramaAsset";

interface PanoramaEditorHudProps {
    panorama: PanoramaAsset
}

export default function PanoramaEditorHud({panorama}: PanoramaEditorHudProps) {


    return (
        <AssetEditorHud placement={"bottom"}>

            <OpenAssetFolderButton asset={panorama}/>

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
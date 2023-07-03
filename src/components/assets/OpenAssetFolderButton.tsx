import React from "react";

import HudButton from "@components/assets/HudButton";
import Asset from "@platform/assets/Asset";
import TauriOsPlugin from "../../tauri/plugin_os";
import FsTools from "@api/FsTools";
import PlatformDispatcher from "@api/PlatformDispatcher";


interface OpenAssetFolderButton {
    asset: Asset
}

export default function OpenAssetFolderButton({asset}: OpenAssetFolderButton) {
    const clicked = () => {

        const folder = FsTools.NormalizePath(asset.GetFolderPath())
        TauriOsPlugin.OpenFolder(folder).then(() => {
            console.log("Opened")
        })
    }

    if (PlatformDispatcher.IsDesktop() && asset.extension !== "") {
        return (
            <HudButton

                lang={"open"}
                icon={"/icons/Projects.svg"}
                onClick={clicked}
            />
        )
    } else {
        return (<></>)
    }


}
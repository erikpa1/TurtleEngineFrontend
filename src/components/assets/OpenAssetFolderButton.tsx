import React from "react";

import HudButton from "@components/assets/HudButton";
import AssetParent from "@platform/assets/AssetParent";
import TauriOsPlugin from "../../tauri/plugin_os";
import FsTools from "@api/FsTools";
import PlatformDispatcher from "@api/PlatformDispatcher";


interface OpenAssetFolderButton {
    asset: AssetParent
}

export default function OpenAssetFolderButton({asset}: OpenAssetFolderButton) {
    const clicked = () => {

        const folder = FsTools.NormalizePath(asset.GetFolderPath())
        TauriOsPlugin.OpenFolder(folder).then(() => {
            console.log("Opened")
        })
    }

    if (PlatformDispatcher.IsDesktop()) {
        return (
            <HudButton
                lang={"core.open"}
                icon={"/icons/Projects.svg"}
                onClick={clicked}
            />
        )
    } else {
        return (<></>)
    }


}
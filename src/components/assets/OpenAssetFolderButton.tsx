import React from "react";

import HudButton from "@components/assets/HudButton";
import AssetParent from "@platform/assets/AssetParent";
import TauriOsPlugin from "../../tauri/plugin_os";
import FsApi from "@api/FsApi";
import PlatformDispatcher from "@api/PlatformDispatcher";


interface OpenAssetFolderButton {
    asset: AssetParent
}

export default function OpenAssetFolderButton() {
    const clicked = () => {
        console.log("Here")
        const folder = FsApi.normalizePath("C:\\Work\\TurtleEngine")
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
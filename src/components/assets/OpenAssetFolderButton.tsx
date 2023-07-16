import React from "react";

import HudButton from "@components/assets/HudButton";
import Asset from "@platform/assets/Asset";
import TauriOsPlugin from "../../tauri/plugin_os";
import FsTools from "@api/FsTools";
import PlatformDispatcher from "@api/PlatformDispatcher";
import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";


interface OpenAssetFolderButton {
    asset: Asset
}

export default function OpenAssetFolderButton({asset}: OpenAssetFolderButton) {

    const lock = useGlobalAppLock()
    const clicked = () => {

        lock.lock()

        const folder = FsTools.NormalizePath(asset.GetFolderPath())

        TauriOsPlugin.OpenFolder(folder)

        setTimeout(lock.unlock, 1000)
    }

    if (PlatformDispatcher.IsDesktop()) {
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
import React from "react";

import {MiddleSpinner} from "@components/Spinners";

import VirtualSceneEditor from "@components/assets/scene-editor/VirtualSceneEditor";

import PanoramaSceneEditor from "@components/assets/scene-editor/PanoramaSceneEditor";

import {useLoadAssetFromParams} from "@components/assets/assets_hooks";

export default function SceneEditorDispatcher({}): any {

    const asset = useLoadAssetFromParams()

    if (asset) {
        if (asset.subtype === "panorama") {
            return (
                <PanoramaSceneEditor asset={asset}/>
            )
        } else if (asset.subtype === "virtual") {
            return (
                <VirtualSceneEditor asset={asset}/>
            )
        }
    } else {
        return (
            <MiddleSpinner/>
        )
    }
}

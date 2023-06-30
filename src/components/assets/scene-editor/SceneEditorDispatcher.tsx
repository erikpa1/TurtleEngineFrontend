import React from "react";
import {useParams} from "react-router-dom";

import AssetsApi from "@api/AssetsApi";
import {MiddleSpinner} from "@components/Spinners";

import VirtualSceneEditor from "@components/assets/scene-editor/VirtualSceneEditor";
import {Assets} from "@platform/assets/Assets";
import SceneAsset from "@platform/assets/SceneAsset";
import PanoramaSceneEditor from "@components/assets/scene-editor/PanoramaSceneEditor";

export default function SceneEditorDispatcher({}) {

    const {projectuid, sceneuid} = useParams()

    const _projectUid: string = projectuid ?? ""
    const _sceneUid: string = sceneuid ?? ""

    const [scene, setScene] = React.useState<SceneAsset | null>(null)

    React.useEffect(() => {
        AssetsApi.GetAssetData<SceneAsset>(Assets.Scene, _projectUid, _sceneUid).then((value) => {
            setScene(value)
        })
    }, [_projectUid, _sceneUid])

    if (scene) {
        if (scene.subtype === "panorama") {
            return (
                <PanoramaSceneEditor scene={scene}/>
            )
        } else if (scene.subtype === "virtual") {
            return (
                <VirtualSceneEditor scene={scene}/>
            )
        }
    } else {
        return (
            <MiddleSpinner/>
        )
    }
}

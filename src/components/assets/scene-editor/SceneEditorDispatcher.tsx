import React from "react";
import {useParams} from "react-router-dom";

import AssetsApi from "@api/AssetsApi";
import {MiddleSpinner} from "@components/Spinners";

import VirtualSceneEditor from "@components/assets/scene-editor/VirtualSceneEditor";
import {Assets} from "@platform/assets/Assets";
import SceneAsset from "@platform/assets/SceneAsset";


export default function SceneEditorDispatcher({}) {
    const {projectuid, clouduid} = useParams()

    const _projectUid: string = projectuid ?? ""
    const _sceneUid: string = clouduid ?? ""

    const [scene, setScene] = React.useState<SceneAsset | null>(null)

    React.useEffect(() => {

        AssetsApi.GetAssetData(Assets.Scene, _projectUid, _sceneUid).then((value) => {
            setScene(value)
        })

    }, [_projectUid, _sceneUid])

    if (scene) {
        return (
            <VirtualSceneEditor scene={scene}/>
        )
    } else {
        return (
            <MiddleSpinner/>
        )
    }
}

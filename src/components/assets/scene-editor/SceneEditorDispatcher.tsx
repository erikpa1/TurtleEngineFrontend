import React from "react";
import {useParams} from "react-router-dom";
import PanoramaAsset from "@platform/assets/PanoramaAsset";
import AssetsApi from "@api/AssetsApi";
import {MiddleSpinner} from "@components/Spinners";
import PanoramaSceneEditor from "@components/assets/scene-editor/PanoramaSceneEditor";
import VirtualSceneEditor from "@components/assets/scene-editor/VirtualSceneEditor";


export default function SceneEditorDispatcher({}) {
    const {projectuid, clouduid} = useParams()

    const _projectUid: string = projectuid ?? ""
    const _sceneUid: string = clouduid ?? ""

    const [scene, setScene] = React.useState<PanoramaAsset | null>(null)

    React.useEffect(() => {

        AssetsApi.GetAsset(PanoramaAsset, _projectUid, _sceneUid).then((value) => {
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

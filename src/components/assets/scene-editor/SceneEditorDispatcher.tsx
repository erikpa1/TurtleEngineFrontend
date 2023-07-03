import React from "react";
import {useParams} from "react-router-dom";

import AssetsApi from "@api/AssetsApi";
import {MiddleSpinner} from "@components/Spinners";

import VirtualSceneEditor from "@components/assets/scene-editor/VirtualSceneEditor";

import PanoramaSceneEditor from "@components/assets/scene-editor/PanoramaSceneEditor";

import {PanoramaSceneData, SceneData, VirtualSceneData} from "@platform/assets/scene";
import Asset from "@platform/assets/Asset";

export default function SceneEditorDispatcher({}) {

    const {projectuid, sceneuid} = useParams()

    const _projectUid: string = projectuid ?? ""
    const _sceneUid: string = sceneuid ?? ""

    const [scene, setScene] = React.useState<Asset | null>(null)

    async function refresh() {
        // setScene(await AssetsApi.(SceneAssetData, _projectUid, _sceneUid))
        const data = await AssetsApi.GetAsset(_projectUid, _sceneUid)
        setScene(data)
    }

    React.useEffect(() => {
        refresh()
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

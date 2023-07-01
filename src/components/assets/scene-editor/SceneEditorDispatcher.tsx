import React from "react";
import {useParams} from "react-router-dom";

import AssetsApi from "@api/AssetsApi";
import {MiddleSpinner} from "@components/Spinners";

import VirtualSceneEditor from "@components/assets/scene-editor/VirtualSceneEditor";

import PanoramaSceneEditor from "@components/assets/scene-editor/PanoramaSceneEditor";

import {PanoramaSceneData, SceneData, VirtualSceneData} from "@platform/assets/scene.ts";
import Asset from "@platform/assets/Asset.ts";

export default function SceneEditorDispatcher({}) {

    const {projectuid, sceneuid} = useParams()

    const _projectUid: string = projectuid ?? ""
    const _sceneUid: string = sceneuid ?? ""

    const [scene, setScene] = React.useState<Asset | null>(null)
    const [sceneData, setSceneData] = React.useState<SceneData | null>(null)

    async function refresh() {
        // setScene(await AssetsApi.(SceneAssetData, _projectUid, _sceneUid))

        const data = await AssetsApi.GetAssetData<PanoramaSceneData>(PanoramaSceneData, _projectUid, _sceneUid)
        setSceneData(data)
    }

    React.useEffect(() => {
        refresh()
    }, [_projectUid, _sceneUid])

    if (sceneData) {
        if (sceneData.subtype === "panorama") {
            return (
                <PanoramaSceneEditor scene={sceneData}/>
            )
        } else if (sceneData.subtype === "virtual") {
            return (
                <VirtualSceneEditor scene={sceneData}/>
            )
        }
    } else {
        return (
            <MiddleSpinner/>
        )
    }
}

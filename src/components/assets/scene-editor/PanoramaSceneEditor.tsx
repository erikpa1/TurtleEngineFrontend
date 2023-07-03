import React from "react";


import SceneAsset from "@platform/assets/scene";


import SceneApi from "@api/project/SceneApi";

import {
    UniversalMeshCanvas,
    UniversalWorldEnvironment,
    UniversalWorldGrid
} from "@components/assets/canvases/UniversalMeshCanvas";

import SceneCameraRotationGizmo from "@components/assets/canvases/SceneCameraRotationGizmo";

import SceneDefinitionDOM from "@components/assets/scene-editor/SceneDefinitionDOM";

import SceneEditorHud from "@components/assets/scene-editor/SceneEditorHud";
import PhotoDom, {PhotoRawDom} from "@components/assets/panorama/PhotoDom";
import PanoramaSceneDefinition from "@platform/assets/scenes/PanoramaSceneDefinition";
import PanoramaAsset from "@platform/assets/panorama";
import FsTools from "@api/FsTools";
import {VirtualSceneData} from "@platform/assets/scene";
import {OrbitControls} from "@react-three/drei";
import Asset from "@platform/assets/Asset";


interface PanoramaSceneEditorProps {
    scene: Asset
}

export default function PanoramaSceneEditor({scene}: PanoramaSceneEditorProps) {

    const [sceneDefinition, setSceneDefinition] = React.useState<{ value: PanoramaSceneDefinition } | null>()

    React.useEffect(() => {
        SceneApi.GetSceneDefinition(PanoramaSceneDefinition, scene.parent_project_uid, scene.uid).then((value) => {
            setSceneDefinition({value: value as PanoramaSceneDefinition})
        })

    }, [])

    if (sceneDefinition) {
        return (
            <_PanoramaSceneEditor
                scene={scene}
                sceneDefinition={sceneDefinition.value}
                onSceneDefinitionChanged={() => {
                    setSceneDefinition({value: sceneDefinition.value})
                }}
            />
        )
    } else {
        return <></>
    }
}

interface _PanoramaSceneEditorProps {
    scene: VirtualSceneData
    sceneDefinition: PanoramaSceneDefinition
    onSceneDefinitionChanged: () => void
}

function _PanoramaSceneEditor(props: _PanoramaSceneEditorProps) {


    return (
        <div style={{
            position: "relative"
        }}>

            <UniversalMeshCanvas>

                <UniversalWorldEnvironment/>
                <SceneCameraRotationGizmo/>
                {/*<SceneTransformHelper/>*/}

                {/*<_ExampleMeshes/>*/}

                <SceneDefinitionDOM sceneDefinition={props.sceneDefinition}/>

                <_PanoramaLoader panoramaUid={props.sceneDefinition.panorama_uid}/>


                <OrbitControls makeDefault
                               target={[0, 0.15, 0]}
                               enableDamping={false}
                               maxPolarAngle={Math.PI / 2}
                />

                <UniversalWorldGrid height={-80}/>


            </UniversalMeshCanvas>

            <SceneEditorHud
                sceneDefinition={props.sceneDefinition}
                scene={props.scene}
                onSceneDefinitionChanged={props.onSceneDefinitionChanged}
            />

        </div>
    )
}

function _PanoramaLoader({panoramaUid}) {


    if (panoramaUid && panoramaUid !== "") {
        return (
            <_PanoramaAssetLoader assetUid={panoramaUid}/>
        )
    } else {

        return (
            <PhotoRawDom path={FsTools.GetPlatformPath("Panoramas/PreviewPanorama.jpg")}/>
        )
    }
}


function _PanoramaAssetLoader({assetUid}) {


    const [panoAsset, setPanoAsset] = React.useState<PanoramaAsset | null>(null)

    if (panoAsset) {
        return (
            <PhotoDom panorama={panoAsset}/>
        )
    } else {
        return (<></>)
    }


}



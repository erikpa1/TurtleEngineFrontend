import React from "react";

import {
    UniversalMeshCanvas, UniversalMeshOrbitControls,
    UniversalWorldEnvironment,
    UniversalWorldGrid
} from "@components/assets/canvases/UniversalMeshCanvas";

import SceneEditorHud from "@components/assets/scene-editor/SceneEditorHud";
import SceneCameraRotationGizmo from "@components/assets/canvases/SceneCameraRotationGizmo";

import VirtualSceneDefinition from "@platform/assets/scenes/VirtualSceneDefinition";

import SceneDefinitionDOM from "@components/assets/scene-editor/SceneDefinitionDOM";

import SceneApi from "@api/project/SceneApi";

import Asset from "@platform/assets/Asset";

import {VirtualSceneData} from "@platform/assets/scene";
import {OrbitControls} from "@react-three/drei";


interface VirtualSceneEditorProps {
    scene: Asset
}

export default function VirtualSceneEditor({scene}: VirtualSceneEditorProps) {

    const [sceneDefinition, setSceneDefinition] = React.useState<{ value: VirtualSceneDefinition } | null>()

    React.useEffect(() => {
        SceneApi.GetSceneDefinition(VirtualSceneDefinition, scene.parent_project_uid, scene.uid).then((value) => {
            setSceneDefinition({value: value})
        })

    }, [])

    if (sceneDefinition) {
        return (
            <_VirtualSceneEditor
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

interface _VirtualSceneEditorProps {
    scene: VirtualSceneData
    sceneDefinition: VirtualSceneDefinition
    onSceneDefinitionChanged: () => void
}

function _VirtualSceneEditor(props: _VirtualSceneEditorProps) {


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
                <UniversalMeshOrbitControls/>

                <UniversalWorldGrid/>


            </UniversalMeshCanvas>

            <SceneEditorHud
                sceneDefinition={props.sceneDefinition}
                scene={props.scene}
                onSceneDefinitionChanged={props.onSceneDefinitionChanged}
            />

        </div>
    )
}


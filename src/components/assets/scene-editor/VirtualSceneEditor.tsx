import React from "react";

import {UniversalMeshCanvas, UniversalWorldEnvironment} from "@components/assets/canvases/UniversalMeshCanvas";

import SceneEditorHud from "@components/assets/scene-editor/SceneEditorHud";
import SceneCameraRotationGizmo from "@components/assets/canvases/SceneCameraRotationGizmo";

import SceneAsset from "@platform/assets/SceneAsset";
import SceneDefinition from "@platform/scene/SceneDefinition";
import SceneDefinitionDOM from "@components/assets/scene-editor/SceneDefinitionDOM";

import SceneApi from "@api/project/SceneApi";


interface VirtualSceneEditorProps {
    scene: SceneAsset
}

export default function VirtualSceneEditor({scene}: VirtualSceneEditorProps) {


    const [sceneDefinition, setSceneDefinition] = React.useState<{ value: SceneDefinition } | null>()

    React.useEffect(() => {
        SceneApi.GetSceneDefinition(scene.parent_project_uid, scene.uid).then((value) => {

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
    scene: SceneAsset
    sceneDefinition: SceneDefinition
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

            </UniversalMeshCanvas>

            <SceneEditorHud
                sceneDefinition={props.sceneDefinition}
                scene={props.scene}
                onSceneDefinitionChanged={props.onSceneDefinitionChanged}
            />

        </div>
    )
}


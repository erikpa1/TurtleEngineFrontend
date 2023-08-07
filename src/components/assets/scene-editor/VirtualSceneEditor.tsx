import React from "react";

import {
    UniversalMeshCanvas,
    UniversalMeshOrbitControls,
    UniversalWorldEnvironment,
    UniversalWorldGrid
} from "@components/assets/canvases/UniversalMeshCanvas";

import SceneEditorHud from "@components/assets/scene-editor/SceneEditorHud";
import SceneCameraRotationGizmo from "@components/assets/canvases/SceneCameraRotationGizmo";

import VirtualSceneDefinition from "@platform/assets/scenes/VirtualSceneDefinition";

import EntitiesDOM from "@components/assets/scene-editor/EntitiesDOM";

import SceneApi from "@api/project/SceneApi";

import Asset from "@platform/assets/Asset";
import PhysicsWorld from "@platform/physics/PhysicsWorld";
import {DnDBox3D} from "@components/assets/tools/DndBox";


interface VirtualSceneEditorProps {
    asset: Asset
}

export default function VirtualSceneEditor({asset}: VirtualSceneEditorProps) {

    const [sceneDefinition, setSceneDefinition] = React.useState<[VirtualSceneDefinition] | null>([asset.data])

    if (sceneDefinition) {
        return (
            <_VirtualSceneEditor
                asset={asset}
                sceneDefinition={sceneDefinition[0]}
                onSceneDefinitionChanged={() => {
                    setSceneDefinition([asset.data])
                }}
            />
        )
    } else {
        return <></>
    }
}

interface _VirtualSceneEditorProps {
    asset: any
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

                <EntitiesDOM sceneDefinition={props.sceneDefinition}/>
                <UniversalMeshOrbitControls/>

                <UniversalWorldGrid/>

                {/*<PhysicsWorld/>*/}

                <DnDBox3D/>

            </UniversalMeshCanvas>

            <SceneEditorHud
                sceneDefinition={props.sceneDefinition}
                asset={props.asset}
                onSceneDefinitionChanged={props.onSceneDefinitionChanged}
            />

        </div>
    )
}


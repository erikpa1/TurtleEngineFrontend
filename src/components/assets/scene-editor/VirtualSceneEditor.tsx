import React from "react";

import {PrimitiveMesh, PrimitiveMeshEditable} from "@components/assets/mesh/PrimitiveMesh";

import {UniversalMeshCanvas, UniversalWorldEnvironment} from "@components/assets/canvases/UniversalMeshCanvas";

import SceneEditorHud from "@components/assets/scene-editor/SceneEditorHud";
import SceneCameraRotationGizmo from "@components/assets/canvases/SceneCameraRotationGizmo";
import SceneTransformHelper from "@components/assets/canvases/SceneTransformHelper";


export default function VirtualSceneEditor({scene}) {
    return (
        <_VirtualSceneEditor/>
    )
}

function _VirtualSceneEditor({}) {
    return (
        <div style={{
            position: "relative"
        }}>

            <UniversalMeshCanvas>

                <UniversalWorldEnvironment/>
                <SceneCameraRotationGizmo/>
                <SceneTransformHelper/>

                <PrimitiveMeshEditable
                    meshPath={"/dev/assets/mesh/tmp-mesh/Default.glb"}
                />

                <PrimitiveMeshEditable
                    meshPath={"/dev/assets/mesh/tmp-cones/Default.glb"}
                    position={[10, 0, 0]}
                />

            </UniversalMeshCanvas>

            <SceneEditorHud/>

        </div>
    )
}


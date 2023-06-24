import React from "react";

import {PrimitiveMesh, PrimitiveMeshEditable} from "@components/assets/mesh/PrimitiveMesh";

import {UniversalMeshCanvas, UniversalWorldEnvironment} from "@components/assets/canvases/UniversalMeshCanvas";

import SceneEditorHud from "@components/assets/scene-editor/SceneEditorHud";
import SceneCameraRotationGizmo from "@components/assets/canvases/SceneCameraRotationGizmo";
import SceneTransformHelper from "@components/assets/canvases/SceneTransformHelper";
import {AnimatedMeshEditable} from "@components/assets/mesh/AnimatedMesh";
import {TeleportBoardEditHandler, TeleportBoardHandler} from "@components/assets/boards/TeleportBoardHandler";


export default function VirtualSceneEditor({scene}) {
    return (
        <_VirtualSceneEditor scene={scene}/>
    )
}

function _VirtualSceneEditor({scene}) {
    return (
        <div style={{
            position: "relative"
        }}>

            <UniversalMeshCanvas>

                <UniversalWorldEnvironment/>
                <SceneCameraRotationGizmo/>
                {/*<SceneTransformHelper/>*/}

                <PrimitiveMeshEditable
                    meshPath={"/dev/assets/mesh/tmp-mesh/Default.glb"}
                />

                <AnimatedMeshEditable
                    meshPath={"/dev/assets/mesh/tmp-animated/Default.glb"}
                    position={[0, 0, 10]}
                    scale={[0.05, 0.05, 0.05]}
                />

                <PrimitiveMeshEditable
                    meshPath={"/dev/assets/mesh/tmp-cones/Default.glb"}
                    position={[10, 0, 0]}
                />

                <TeleportBoardEditHandler
                    position={[2, 1, 0]}
                />

            </UniversalMeshCanvas>

            <SceneEditorHud scene={scene}/>

        </div>
    )
}


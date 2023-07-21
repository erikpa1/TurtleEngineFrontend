import React from "react";


import MeshEditorHud from "@components/assets/mesh-editor/MeshEditorHud";

import {
    UniversalMeshCanvas,
    UniversalMeshOrbitControls,
    UniversalWorldEnvironment,
    UniversalWorldGrid
} from "@components/assets/canvases/UniversalMeshCanvas";
import SceneCameraRotationGizmo from "@components/assets/canvases/SceneCameraRotationGizmo";

import {PrimitiveMesh} from "@components/assets/mesh/PrimitiveMesh";
import {MeshAssetData} from "@platform/assets/mesh";

import Asset from "@platform/assets/Asset";
import {useLoadAssetFromParams} from "@components/assets/assets_hooks";

export default function MeshEditor({}) {

    const asset = useLoadAssetFromParams()

    if (asset) {
        return (
            <_MeshEditor asset={asset}/>
        )
    } else {
        return (
            <TGui.MiddleSpinner/>
        )
    }

}

interface _MeshEditorProps {
    asset: Asset
}

function _MeshEditor({asset}: _MeshEditorProps) {

    const mesh: MeshAssetData = asset.data

    const [meshPath, setMeshPath] = React.useState(`${mesh.GetEntryFile()}`)

    console.log(meshPath)

    return (
        <div style={{
            position: "relative"
        }}>
            <UniversalMeshCanvas>

                <UniversalWorldGrid/>

                <SceneCameraRotationGizmo/>

                <UniversalWorldEnvironment/>

                <UniversalMeshOrbitControls/>
                {/*<PivotControls*/}
                {/*    rotation={[0, 0, 0]}*/}
                {/*    anchor={[0, 0, 0]}*/}
                {/*    scale={75}*/}
                {/*    depthTest={false}*/}
                {/*    fixed*/}
                {/*    lineWidth={2}>*/}

                {/*    <mesh castShadow receiveShadow position={[0, 0.5, 0]}>*/}
                {/*        <boxGeometry args={[1, 1, 1]}/>*/}
                {/*        <meshStandardMaterial/>*/}
                {/*    </mesh>*/}
                {/*</PivotControls>*/}


                <PrimitiveMesh meshPath={meshPath}/>

            </UniversalMeshCanvas>

            <MeshEditorHud asset={asset}
                           onRefresh={() => {
                               // const newPath = `${mesh.GetEntryFile()}?rnd=${Math.random()}`
                               // setMeshPath(newPath)
                           }}/>
        </div>
    )
}


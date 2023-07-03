import React from "react";
import {useParams} from "react-router-dom";


import {MiddleSpinner} from "@components/Spinners";

import MeshEditorHud from "@components/assets/mesh-editor/MeshEditorHud";

import {
    UniversalMeshCanvas, UniversalMeshOrbitControls,
    UniversalWorldEnvironment,
    UniversalWorldGrid
} from "@components/assets/canvases/UniversalMeshCanvas";
import SceneCameraRotationGizmo from "@components/assets/canvases/SceneCameraRotationGizmo";

import {PrimitiveMesh} from "@components/assets/mesh/PrimitiveMesh";
import {MeshAssetData} from "@platform/assets/mesh";

import AssetsApi from "@api/AssetsApi";

import {OrbitControls} from "@react-three/drei";

export default function MeshEditor({}) {

    const {projectuid, meshuid} = useParams()

    const _projectUid: string = projectuid ?? ""
    const _meshuidUid: string = meshuid ?? ""

    const [mesh, setMesh] = React.useState<MeshAssetData | null>(null)

    React.useEffect(() => {

        AssetsApi.GetAssetData<MeshAssetData>(MeshAssetData, _projectUid, _meshuidUid).then((value) => {
            setMesh(value)
        })

    }, [_projectUid, _meshuidUid])

    if (mesh) {
        return (
            <_MeshEditor mesh={mesh}/>
        )
    } else {
        return (
            <MiddleSpinner/>
        )
    }

}

interface _MeshEditorProps {
    mesh: MeshAssetData
}

function _MeshEditor({mesh}: _MeshEditorProps) {


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


                {

                }

                <PrimitiveMesh meshPath={meshPath}/>

            </UniversalMeshCanvas>


            <MeshEditorHud mesh={mesh}
                           onRefresh={() => {

                               // const newPath = `${mesh.GetEntryFile()}?rnd=${Math.random()}`
                               // setMeshPath(newPath)
                           }}/>

        </div>
    )
}


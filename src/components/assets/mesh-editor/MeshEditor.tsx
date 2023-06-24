import React from "react";
import {useParams} from "react-router-dom";

import * as three from "three"

import AssetsApi from "@api/AssetsApi";

import MeshAsset from "@platform/assets/MeshAsset";

import {MiddleSpinner} from "@components/Spinners";

import {PivotControls} from "@react-three/drei";

import MeshEditorHud from "@components/assets/mesh-editor/MeshEditorHud";

import {UniversalMeshCanvas, UniversalWorldEnvironment} from "@components/assets/canvases/UniversalMeshCanvas";
import SceneCameraRotationGizmo from "@components/assets/canvases/SceneCameraRotationGizmo";
import {Assets} from "@platform/assets/Assets";
import {PrimitiveMesh} from "@components/assets/mesh/PrimitiveMesh";
import FsTools from "@api/FsTools";


export default function MeshEditor({}) {

    const {projectuid, meshuid} = useParams()

    const _projectUid: string = projectuid ?? ""
    const _meshuidUid: string = meshuid ?? ""

    const [mesh, setMesh] = React.useState<MeshAsset | null>(null)

    React.useEffect(() => {

        AssetsApi.GetAssetData(Assets.Mesh, _projectUid, _meshuidUid).then((value) => {
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
    mesh: MeshAsset
}

function _MeshEditor({mesh}: _MeshEditorProps) {
    return (
        <div style={{
            position: "relative"
        }}>
            <UniversalMeshCanvas>

                <SceneCameraRotationGizmo/>

                <UniversalWorldEnvironment/>


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

                <PrimitiveMesh meshPath={FsTools.ConvertFilePath(mesh.GetEntryFile())}/>

            </UniversalMeshCanvas>


            <MeshEditorHud mesh={mesh}/>

        </div>
    )
}

function _MeshReprezentation({}) {

}
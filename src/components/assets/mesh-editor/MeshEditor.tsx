import React from "react";
import {useParams} from "react-router-dom";

import MaterialAsset from "@platform/assets/MaterialAsset";
import AssetsApi from "@api/AssetsApi";

import MeshAsset from "@platform/assets/MeshAsset";
import {MiddleSpinner} from "@components/Spinners";


import {Canvas, useThree} from "@react-three/fiber";
import {ContactShadows, Environment, OrbitControls, useGLTF} from "@react-three/drei";
import MeshEditorHud from "@components/assets/mesh-editor/MeshEditorHud";


export default function MeshEditor({}) {

    const {projectuid, meshuid} = useParams()

    const _projectUid: string = projectuid ?? ""
    const _meshuidUid: string = meshuid ?? ""

    const [mesh, setMesh] = React.useState<MeshAsset | null>(null)

    React.useEffect(() => {

        AssetsApi.GetAsset(MeshAsset, _projectUid, _meshuidUid).then((value) => {
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
        <div style={{}}>


            <Canvas
                shadows
                className={"gl-canvas"}
                style={{
                    height: "100vh"
                }}
            >
                <ambientLight/>

                <React.Suspense fallback={""}>
                    <Environment
                        preset={"sunset"}
                        ground={{height: 1, radius: 0}}
                    />
                </React.Suspense>

                <ContactShadows position={[0, -0.8, 0]} opacity={0.25} scale={10} blur={1.5} far={0.8}/>

                <OrbitControls makeDefault
                               target={[0, 0.15, 0]}
                               enableDamping={false}
                               maxPolarAngle={Math.PI / 2}
                />

                <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow/>


                <_InitCanvas/>

                <DefaultMesh/>

            </Canvas>

            <MeshEditorHud/>

        </div>
    )
}

function _InitCanvas() {

    const {camera} = useThree()

    React.useEffect(() => {
        const _camera: three.PerspectiveCamera = camera as any
        _camera.far = 100000
        _camera.near = 0.0005
        _camera.updateProjectionMatrix()

    }, [])

    return (
        <></>
    )
}


function DefaultMesh() {

    const meshPath = "/dev/assets/mesh/tmp-mesh/Default.glb"

    const gltf = useGLTF(meshPath, true)

    return (
        <React.Suspense fallback={null}>
            <primitive object={gltf.scene}/>
        </React.Suspense>
    )
}

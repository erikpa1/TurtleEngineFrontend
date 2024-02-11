import React from "react";
import ErrorBoundary from "@components/ErrorBoundary";
import {useGLTF} from "@react-three/drei";
import {MeshStandardMaterial} from "three";

import * as three from "three"

interface PrimitiveMeshProps {
    meshPath: string
    position?: [number, number, number] | any
    rotation?: [number, number, number] | any
    scale?: [number, number, number] | any
    ref?: any
    materialOverride?: any
}


export function PrimitiveMesh(props: PrimitiveMeshProps) {
    return (
        <ErrorBoundary onError={<ErrorMesh/>}>
            <React.Suspense fallback={""}>
                <_Mesh {...props}/>
            </React.Suspense>
        </ErrorBoundary>
    )
}

function ErrorMesh() {
    const gltf = useGLTF("/meshes/error.glb", true)

    return (
        <React.Suspense fallback={null}>
            <primitive object={gltf.scene}/>
        </React.Suspense>
    )
}

const EMPTY_RAYCAST = () => []

function _Mesh(props: PrimitiveMeshProps) {

    const gltf = useGLTF(props.meshPath, true)

    return (
        <primitive
            raycast={EMPTY_RAYCAST}
            ref={props.ref}
            object={gltf.scene.clone(true)}
            position={props.position ?? [0, 0, 0]}
            scale={props.scale ?? [1, 1, 1]}
            rotation={props.rotation ?? [0, 0, 0]}
        />

    )
}

import React from "react";

import {useGLTF} from "@react-three/drei";
import {ErrorMesh} from "@components/assets/mesh/ErrorMesh";

import ErrorBoundary from "@components/ErrorBoundary";


interface AnimatedMeshProps {
    meshPath: string
    position?: [number, number, number]
    scale?: [number, number, number]
}

export default function AnimatedMesh(props: AnimatedMeshProps) {

    return (
        <ErrorBoundary onError={<ErrorMesh/>}>
            <_Mesh {...props}/>
        </ErrorBoundary>

    )
}

function _Mesh(props: AnimatedMeshProps) {

    const gltf = useGLTF(props.meshPath, true)

    return (
        <React.Suspense fallback={null}>
            <primitive
                object={gltf.scene.clone(true)}
                position={props.position ?? [0, 0, 0]}
                scale={props.scale ?? [1, 1, 1]}
            />
        </React.Suspense>
    )
}
import React from "react";

import {useThree} from "@react-three/fiber";


import {useGLTF} from "@react-three/drei";
import ErrorBoundary from "@components/ErrorBoundary";
import {ErrorMesh} from "@components/assets/mesh/ErrorMesh";

import * as three from "three"

interface PrimitiveMeshProps {
    meshPath: string
    position?: [number, number, number]
    scale?: [number, number, number]
}

export default function PrimitiveMesh(props: PrimitiveMeshProps) {


    console.log(props.meshPath)

    return (
        <ErrorBoundary onError={<ErrorMesh/>}>
            <_Mesh {...props}/>
        </ErrorBoundary>

    )
}

function _Mesh(props: PrimitiveMeshProps) {

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
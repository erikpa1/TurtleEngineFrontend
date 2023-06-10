import React from "react";

import {useThree} from "@react-three/fiber";


import {Plane, useGLTF} from "@react-three/drei";
import ErrorBoundary from "@components/ErrorBoundary";
import {ErrorMesh} from "@components/assets/mesh/ErrorMesh";

import * as three from "three"

interface PrimitiveMeshProps {
    meshPath: string
    position?: [number, number, number]
    scale?: [number, number, number]
}

export function PrimitiveMesh(props: PrimitiveMeshProps) {
    return (
        <ErrorBoundary onError={<ErrorMesh/>}>
            <_Mesh {...props}/>
        </ErrorBoundary>
    )
}


interface PrimitiveMeshEditableProps extends PrimitiveMeshProps {
    onClick?: () => void
}

export function PrimitiveMeshEditable(props: PrimitiveMeshEditableProps) {

    const {gl} = useThree()

    const planeRef = React.useRef<any>()

    return (
        <ErrorBoundary onError={<ErrorMesh/>}>

            <Plane
                ref={planeRef}
                scale={[0.5, 0.5, 0.5]}
                position={props.position ?? [0, 0, 0]}
                rotation={[Math.PI / -2, 0, 0]}
                renderOrder={0}
                onClick={() => {

                }}
                onPointerOver={(event) => {
                    gl.domElement.style.cursor = "pointer"
                }}
                onPointerOut={(event) => {
                    gl.domElement.style.cursor = "default"
                }}
            >
                <meshBasicMaterial
                    transparent={true}
                    opacity={0.5}
                    color={"red"}
                    depthTest={false}
                />
            </Plane>

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
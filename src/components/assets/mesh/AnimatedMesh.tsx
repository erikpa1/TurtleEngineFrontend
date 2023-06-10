import React from "react";

import {Plane, useGLTF} from "@react-three/drei";
import {ErrorMesh} from "@components/assets/mesh/ErrorMesh";

import ErrorBoundary from "@components/ErrorBoundary";
import {useFrame, useThree} from "@react-three/fiber";
import * as three from "three";
import SceneTransformHelper from "@components/assets/canvases/SceneTransformHelper";


interface AnimatedMeshProps {
    meshPath: string
    position?: [number, number, number]
    scale?: [number, number, number]
}


export function AnimatedMesh(props: AnimatedMeshProps) {

    return (
        <ErrorBoundary onError={<ErrorMesh/>}>
            <_AnimatedMesh {...props}/>
        </ErrorBoundary>

    )
}


interface AnimatedMeshEditableProps extends AnimatedMeshProps {
    onClick?: () => void
}

export function AnimatedMeshEditable(props: AnimatedMeshEditableProps) {

    const {gl} = useThree()

    const [useGizmo, setUseGizmo] = React.useState(false)

    const [position, setPosition] = React.useState(props.position ?? [0, 0, 0])

    const planeRef = React.useRef<any>()

    function gizmoMove(obj: three.Object3D, gizmoType: string) {
        setPosition([obj.position.x, obj.position.y, obj.position.z])
    }

    return (
        <ErrorBoundary onError={<ErrorMesh/>}>

            {
                useGizmo && <SceneTransformHelper
                    onValueChanged={gizmoMove}
                    position={position as any}
                />
            }

            <Plane
                ref={planeRef}
                scale={[0.5, 0.5, 0.5]}
                position={position as any}
                rotation={[Math.PI / -2, 0, 0]}

                renderOrder={0}
                onClick={() => {
                    setUseGizmo(!useGizmo)
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
                    side={three.DoubleSide}
                    opacity={0.5}
                    color={"red"}
                    depthTest={false}
                />
            </Plane>

            <_AnimatedMesh {...{...props, position: position}}/>
        </ErrorBoundary>
    )
}

function _AnimatedMesh(props: AnimatedMeshProps) {

    const gltf = useGLTF(props.meshPath, true)

    const clock = new three.Clock()

    const [mixer] = React.useState<any>(gltf.animations.length > 0 ? new three.AnimationMixer(gltf.scene) : null)

    React.useEffect(() => {

        const hasAnimations = gltf.animations.length > 0

        if (hasAnimations) {
            mixer.clipAction(gltf.animations[0]).play()
        }
    })

    useFrame(() => {
        if (mixer) {
            mixer.update(clock.getDelta())
        }
    })


    return (
        <React.Suspense fallback={null}>
            <group
                position={props.position ?? [0, 0, 0]}
                scale={props.scale ?? [1, 1, 1]}
            >
                <primitive
                    object={gltf.scene}

                />
            </group>

        </React.Suspense>
    )
}
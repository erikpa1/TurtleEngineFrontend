import React from "react";

import {useThree} from "@react-three/fiber";


import {Plane, useGLTF} from "@react-three/drei";
import ErrorBoundary from "@components/ErrorBoundary";
import {ErrorMesh} from "@components/assets/mesh/ErrorMesh";

import * as three from "three"
import SceneTransformHelper from "@components/assets/canvases/SceneTransformHelper";
import {use} from "i18next";
import {useMeshHover} from "@components/assets/tools/useMeshHover";
import FsTools from "@api/FsTools";

interface PrimitiveMeshProps {
    meshPath: string
    position?: [number, number, number] | any
    rotation?: [number, number, number] | any
    scale?: [number, number, number] | any
}

export function PrimitiveMesh(props: PrimitiveMeshProps) {
    return (
        <ErrorBoundary onError={<ErrorMesh/>}>
            <_Mesh {...props}/>
        </ErrorBoundary>
    )
}


interface PrimitiveMeshEditableProps extends PrimitiveMeshProps {
    onClick?: () => void,
    onPositionChanged?: (position: [number, number, number] | number[]) => void
    onRotationChanged?: (rotation: [number, number, number] | number[]) => void
    onScaleChanged?: (scale: [number, number, number] | number[]) => void
}

export function PrimitiveMeshEditable(props: PrimitiveMeshEditableProps) {

    const {gl} = useThree()

    const [hover] = useMeshHover()

    const [useGizmo, setUseGizmo] = React.useState(false)
    const [position, setPosition] = React.useState(props.position ?? [0, 0, 0])

    const planeRef = React.useRef<any>()

    function gizmoMove(obj: three.Object3D, gizmoType: string) {
        const newPosition = [obj.position.x, obj.position.y, obj.position.z]
        setPosition([obj.position.x, obj.position.y, obj.position.z])

        if (props.onPositionChanged) {
            props.onPositionChanged(newPosition)
        }

    }

    return (
        <ErrorBoundary onError={<ErrorMesh/>}>

            {
                useGizmo && <SceneTransformHelper
                    onValueChanged={gizmoMove}
                    position={position}
                />
            }

            <Plane
                ref={planeRef}
                scale={[0.5, 0.5, 0.5]}
                position={position as any}
                rotation={[Math.PI / -2, 0, 0]}

                renderOrder={0}
                onClick={(e) => {
                    setUseGizmo(!useGizmo)
                }}
                {
                    ...hover
                }

            >
                <meshBasicMaterial
                    transparent={true}
                    side={three.DoubleSide}
                    opacity={0.5}
                    color={"red"}
                    depthTest={false}
                />
            </Plane>

            <_Mesh {...{...props, position: position}}/>
        </ErrorBoundary>
    )
}


function _Mesh(props: PrimitiveMeshProps) {

    const meshPath = FsTools.ConvertFilePath(props.meshPath)

    const gltf = useGLTF(meshPath, true)

    return (
        <React.Suspense fallback={null}>
            <primitive
                object={gltf.scene.clone(true)}
                position={props.position ?? [0, 0, 0]}
                scale={props.scale ?? [1, 1, 1]}
                rotation={props.rotation ?? [0, 0, 0]}
            />
        </React.Suspense>
    )
}
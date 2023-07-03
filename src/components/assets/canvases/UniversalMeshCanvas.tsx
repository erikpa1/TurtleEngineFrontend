import {Canvas} from "@react-three/fiber";
import {
    AccumulativeShadows,
    CameraControls,
    Environment, GizmoHelper, GizmoViewport,
    Grid,
    OrbitControls,
    RandomizedLight
} from "@react-three/drei";

import React from "react";

import SceneCameraRotationGizmo from "@components/assets/canvases/SceneCameraRotationGizmo";
import {useActiveNodeZus} from "@components/assets/scene-editor/scene-zuses";

interface UniversalMeshCanvasProps {
    children: any
    preserveDrawingBuffer?: boolean
    style?: React.CSSProperties
}

export function UniversalMeshCanvas(props: UniversalMeshCanvasProps) {

    const activeNodeZus = useActiveNodeZus()

    return (
        <div style={{
            backgroundColor: "#303035"
        }}>


            <Canvas
                shadows
                className={"gl-canvas"}
                gl={{
                    preserveDrawingBuffer: props.preserveDrawingBuffer ?? false
                }}

                onDoubleClick={() => {
                    activeNodeZus.setActiveNode(null)
                }}


                camera={{
                    far: 10000,
                    position: [4, 3, 12]
                }}

                style={{
                    height: "100vh",
                    ...(props.style ? props.style : {})
                }}
                raycaster={{params: {Line: {threshold: 0.15}}}}
            >

                <directionalLight castShadow position={[2.5, 5, 5]} intensity={1.5} shadow-mapSize={[1024, 1024]}>
                    <orthographicCamera attach="shadow-camera" args={[-5, 5, 5, -5, 1, 50]}/>
                </directionalLight>

                {/*<AccumulativeShadows frames={100} color="#9d4b4b" colorBlend={0.5} alphaTest={0.9} scale={20}>*/}
                {/*    <RandomizedLight amount={8} radius={4} position={[5, 5, -10]}/>*/}
                {/*</AccumulativeShadows>*/}

                {/*<CameraControls/>*/}


                {
                    React.Children.toArray(props.children)
                }


            </Canvas>
        </div>

    )
}


interface UniversalWorldGridProps {
    height?: number
}

export function UniversalWorldGrid(props: UniversalWorldGridProps) {
    const gridConfig = {
        cellSize: 0.5,
        cellThickness: 0.5,
        cellColor: '#6f6f6f',
        sectionSize: 3,
        sectionThickness: 1,
        sectionColor: '#9d4b4b',
        // fadeDistance: 30,
        // fadeStrength: 1,
        followCamera: false,
        infiniteGrid: true
    }
    return <Grid
        position={[0, props.height ?? -0.01, 0]}
        args={[10.5, 10.5]}
        {...gridConfig}
    />
}

export function UniversalWorldEnvironment({}) {
    return (
        <React.Suspense fallback={""}>
            <Environment preset={"forest"}/>


        </React.Suspense>
    )
}

export function UniversalMeshOrbitControls({}) {
    return (
        <OrbitControls makeDefault target={[0, 0, 0]}
                       enableDamping={false}
                       maxPolarAngle={Math.PI / 2}/>
    )
}
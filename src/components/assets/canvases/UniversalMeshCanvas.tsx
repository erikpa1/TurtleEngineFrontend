import {Canvas} from "@react-three/fiber";
import {
    AccumulativeShadows,
    CameraControls,
    Environment,
    Grid,
    OrbitControls,
    RandomizedLight
} from "@react-three/drei";
import {PrimitiveMesh} from "@components/assets/mesh/PrimitiveMesh";
import React from "react";

export function UniversalMeshCanvas({children}) {
    return (
        <div style={{
            backgroundColor: "#303035"
        }}>
            <Canvas
                shadows
                className={"gl-canvas"}

                camera={{
                    far: 10000,
                    position: [4, 3, 12]
                }}

                style={{
                    height: "100vh"
                }}
            >

                {/*<AccumulativeShadows frames={100} color="#9d4b4b" colorBlend={0.5} alphaTest={0.9} scale={20}>*/}
                {/*    <RandomizedLight amount={8} radius={4} position={[5, 5, -10]}/>*/}
                {/*</AccumulativeShadows>*/}

                {/*<CameraControls/>*/}

                <OrbitControls makeDefault target={[0, 0, 0]}
                               enableDamping={false}
                               maxPolarAngle={Math.PI / 2}/>

                <UniversalWorldGrid/>


                {
                    React.Children.toArray(children)
                }


            </Canvas>
        </div>

    )
}

export function UniversalWorldGrid({}) {
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
    return <Grid position={[0, -0.01, 0]} args={[10.5, 10.5]} {...gridConfig} />
}

export function UniversalWorldEnvironment({}) {
    return (
        <React.Suspense fallback={""}>
            <Environment preset={"forest"}/>


        </React.Suspense>
    )
}
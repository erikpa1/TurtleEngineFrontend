import React from "react";
import {Canvas} from "@react-three/fiber";
import {Environment, Grid, Line, MapControls} from "@react-three/drei";


interface WorldCanvasWrapperProps {
    children: any
}

export default function WorldCanvasWrapper({children}: WorldCanvasWrapperProps) {

    return (
        <Canvas
            shadows
            className={"gl-canvas"}
            camera={{
                far: 10000,
                position: [4, 3, 12]
            }}
            style={{
                background: 'radial-gradient(#9fadc2, #d4dff1)',
                height: "100%"
            }}
            raycaster={{params: {Line: {threshold: 0.15}}}}
            onDoubleClick={() => {
                //Pass nothing yet
            }}
        >
            <ambientLight/>

            <_Grid/>

            <React.Suspense fallback={""}>
                <Environment files={"/textures/venice_sunset_1k.hdr"}/>
            </React.Suspense>

            <MapControls/>

            {
                React.Children.toArray(children)
            }

        </Canvas>
    )
}


function _Grid({}) {
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
    return (
        <>
            <Grid
                position={[0, -0.01, 0]}
                args={[10.5, 10.5]}
                {...gridConfig}

            />
            <Line
                points={[
                    [-1000, 0, 0],
                    [1000, 0, 0]
                ]} color={"red"}
            />
            <Line
                points={[
                    [0, 0, -1000],
                    [0, 0, 1000]
                ]} color={"blue"}
            />

        </>
    )
}
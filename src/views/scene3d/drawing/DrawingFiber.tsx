import React from "react";
import {Box, Line} from "@react-three/drei";
import {Drawing} from "@data/drawings";


const DrawingFiber = React.forwardRef(({}, ref) => {


    const [drawings, setDrawings] = React.useState<Array<Drawing>>()

    const [drawingState, setDrawingState] = React.useState("line")


    function setDrawingBox() {
        //pass
    }

    function setDrawingBoxMesh() {
        //pass
    }

    function setDrawingLine() {
        //pass
    }

    function setDrawingCircle() {
        //pass
    }


    React.useImperativeHandle(ref, () => ({
        setDrawingBox,
        setDrawingBoxMesh,
        setDrawingLine,
        setDrawingCircle,
    }))


    const [position, setPosition] = React.useState([0, 0, 0])

    return (
        <group>

            <group
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0, 0]}
                scale={[1000, 1000, 1000]}
                onPointerMove={(e) => {
                    const position = e.point
                    setPosition([position.x, position.y, position.z])
                    //pass
                }}
            >
                <mesh visible={false}>
                    <planeGeometry args={[1, 1]}/>
                </mesh>
            </group>

            {/*<Line*/}
            {/*    points={[*/}
            {/*        [0, 0, 10],*/}
            {/*        [10, 0, 10],*/}
            {/*        [10, 0, 20]*/}
            {/*    ]}*/}
            {/*    color={"red"}*/}
            {/*/>*/}

            <_DrawingCursor position={position}/>

        </group>
    )
})

function _DrawingCursor({position}) {
    return (
        <group position={position}>

            <Line
                renderOrder={999}
                points={[
                    [-0.5, 0, 0],
                    [0.5, 0, 0]
                ]} color={"red"}
            />
            <Line
                renderOrder={999}
                points={[
                    [0, 0, -0.5],
                    [0, 0, 0.5]
                ]} color={"blue"}
            />
            <Line
                renderOrder={999}
                points={[
                    [0, 0, 0],
                    [0, 0.5, 0]
                ]} color={"green"}
            />


        </group>
    )
}

export default DrawingFiber
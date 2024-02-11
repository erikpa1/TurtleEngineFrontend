import React from "react";
import {Box, Line} from "@react-three/drei";


const DrawingFiber = React.forwardRef(({}, ref) => {


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
import React from "react";
import {Plane} from "@react-three/drei";

import * as three from "three"

export default function VideoBoardHandler({}) {

    const scaleX = 1
    const scaleY = 0.5

    const aspectX = 0.5
    const aspectY = 1

    return (
        <group position={[0, 0.25, 0]}>

            <_BackgroundMesh
                scaleX={scaleX}
                scaleY={scaleY}/>

            <_VideoMesh
                scaleX={scaleX}
                scaleY={scaleY}
                aspectX={aspectX}
                aspectY={aspectY}
            />

        </group>
    )
}


interface _BackgroundMeshProps {
    scaleX: number
    scaleY: number
}


function _BackgroundMesh({scaleX, scaleY}: _BackgroundMeshProps) {
    return (
        <Plane scale={[scaleX, scaleY, 1]}>
            <meshBasicMaterial
                transparent={true}
                opacity={0.5}
                side={three.DoubleSide}
                color={"black"}/>
        </Plane>
    )
}

interface _VideoMeshProps {
    scaleX: number
    scaleY: number
    aspectX: number
    aspectY: number
}


function _VideoMesh({
                        scaleX,
                        scaleY,
                        aspectX,
                        aspectY
                    }: _VideoMeshProps) {


    let finalScaleX = 1
    let finalScaleY = 1



    return (
        <Plane position={[0, 0, 0]} scale={[finalScaleX, finalScaleY, 1]}>
            <meshBasicMaterial
                opacity={0.5}
                side={three.DoubleSide}
                color={"red"}/>
        </Plane>
    )
}
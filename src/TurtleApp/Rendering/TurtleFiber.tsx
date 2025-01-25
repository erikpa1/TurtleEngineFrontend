import React from "react";
import {useGLTF} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import {easing} from "maath";


export default function TurtleFiber(props) {

    const {scene}: any = useGLTF('/meshes/turtle.glb')


    return (
        <group {...props}>
            <primitive object={scene}>
                <pointLight intensity={1} color={"yellow"} distance={2.5}/>
            </primitive>
        </group>
    )
}


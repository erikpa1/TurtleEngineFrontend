import React from "react";
import {useGLTF} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three"

export default function GobotFiber(props) {
    const {scene, animations} = useGLTF("/meshes/gobot.glb")

    // console.log(scene)
    const mixer = new THREE.AnimationMixer(scene)

    mixer.clipAction(animations[3]).play()
    useFrame((state, delta) => {
        mixer.update(delta)
    })
    return (
        <group {...props}>
            <primitive object={scene} position={[0, 0, 0]}/>
        </group>
    )
}

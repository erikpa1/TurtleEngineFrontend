import React from "react";
import {useGLTF} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import {easing} from "maath";


export default function KamdoFiber(props) {
    const head = React.useRef<any>()
    const stripe = React.useRef<any>()
    const light = React.useRef<any>()

    const {nodes, materials}: any = useGLTF('/meshes/kamando.glb')

    useFrame((state, delta) => {
        const t = (1 + Math.sin(state.clock.elapsedTime * 2)) / 2
        stripe.current.color.setRGB(2 + t * 20, 2, 20 + t * 50)
        easing.dampE(head.current.rotation, [0, state.pointer.x * (state.camera.position.z > 1 ? 1 : -1), 0], 0.4, delta)
        light.current.intensity = 1 + t * 4
    })
    return (
        <group {...props}>
            <mesh castShadow receiveShadow geometry={nodes.body001.geometry} material={materials.Body}/>
            <group ref={head}>
                <mesh castShadow receiveShadow geometry={nodes.head001.geometry} material={materials.Head}/>
                <mesh castShadow receiveShadow geometry={nodes.stripe001.geometry}>
                    <meshBasicMaterial ref={stripe} toneMapped={false}/>
                    <pointLight ref={light} intensity={1} color={[10, 2, 5]} distance={2.5}/>
                </mesh>
            </group>
        </group>
    )
}


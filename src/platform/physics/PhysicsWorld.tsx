import React from "react";
import {Physics, Debug, useBox, usePlane} from '@react-three/cannon'
import {Sphere} from "@react-three/drei";
import {PrimitiveMesh} from "@components/assets/mesh/PrimitiveMesh";
import FsTools from "@api/FsTools";
import ConstantsApi from "@api/ConstantsApi";


export default function PhysicsWorld() {
    return (
        <Physics gravity={[0, -10, 0]}>
            <Debug color={"red"}>
                <Plane rotation={[-Math.PI / 2, 0, 0]}/>
                <Box position={[0, 2, 0]}/>
                <_TestMesh position={[2, 2, 0]}/>
            </Debug>
        </Physics>
    )
}

function Box(props) {
    const [ref, api] = useBox(
        () => ({args: [1, 1, 1], mass: 1, ...props}),
        React.useRef<any>()
    )

    return (
        <mesh ref={ref} castShadow onPointerDown={() => api.velocity.set(0, 10, 0)}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshNormalMaterial/>
        </mesh>
    )
}

function _TestMesh(props) {

    const [ref, api] = useBox(
        () => ({args: [1, 2, 1], mass: 1, ...props}),
        React.useRef<any>()
    )

    return (
        <group ref={ref} castShadow onPointerDown={() => api.velocity.set(0, 10, 0)}>
            <PrimitiveMesh
                meshPath={ConstantsApi.DEFAULT_MESH_PATH}
                position={[0, -0.75, 0]}
            />
        </group>
    )
}

function Plane(props) {
    const [ref] = usePlane(() => ({mass: 0, ...props}), React.useRef<any>())
    return (
        <mesh ref={ref} receiveShadow>
            <planeGeometry args={[5, 5]}/>
            <meshStandardMaterial/>
        </mesh>
    )
}
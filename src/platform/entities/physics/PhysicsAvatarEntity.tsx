import React from "react";
import {useCylinder} from "@react-three/cannon";

import {SceneEntity} from "@platform/entities/SceneEntity";


import {PhysicalBoxEntity} from "@platform/entities/physics/PhysicsBoxEntity";


export class PhysicalAvatarEntity extends SceneEntity {
    static TYPE = "physics.avatar"
}

interface PhysicsAvatarEntityViewProps {
    node: PhysicalBoxEntity
    children: any
}

export function PhysicsAvatarEntityView(props: PhysicsAvatarEntityViewProps) {

    console.log("Pushing Avatar entity")

    const [ref, api] = useCylinder(
        () => ({
            args: [0.5, 0.5, 2],
            mass: 1,
            position: props.node.position as any,
            angularFactor: [0, 1, 0]
        }),
        React.useRef<any>()
    )


    return (
        <mesh ref={ref} castShadow onPointerDown={() => api.velocity.set(0, 10, 0)}>
            <capsuleGeometry args={[0.5, 2]}/>
            <meshNormalMaterial/>
            {
                props.children
            }
        </mesh>
    )
}
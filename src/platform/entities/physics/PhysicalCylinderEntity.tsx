import {SceneEntity} from "@platform/entities/SceneEntity";
import {useBox, useCylinder} from "@react-three/cannon";
import React from "react";
import {PhysicalBoxEntity} from "@platform/entities/physics/PhysicsBoxEntity";

export class PhysicalCylinderEntity extends SceneEntity {
    static TYPE = "physics.capsule"
}

interface PhysicsCapsuleEntityViewProps {
    entity: PhysicalCylinderEntity
    children: any

}

export function PhysicsCapsuleEntityView(props: PhysicsCapsuleEntityViewProps) {

    console.log("Pushing box entity")

    const [ref, api] = useCylinder(
        () => ({args: [1, 1, 1], mass: 1}),
        React.useRef<any>()
    )

    return (
        <mesh ref={ref} castShadow onPointerDown={() => api.velocity.set(0, 10, 0)}>
            <cylinderGeometry args={[1, 1, 1]}/>
            <meshNormalMaterial/>
            {
                props.children
            }
        </mesh>
    )
}
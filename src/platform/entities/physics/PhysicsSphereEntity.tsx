import {SceneEntity} from "@platform/entities/SceneEntity";
import {useSphere} from "@react-three/cannon";
import React from "react";
import {PhysicalCylinderEntity} from "@platform/entities/physics/PhysicalCylinderEntity";

export class PhysicalSphereEntity extends SceneEntity {
    static TYPE = "physics.sphere"


}

interface PhysicsCapsuleEntityViewProps {
    node: PhysicalCylinderEntity
    children: any

}

export function PhysicalSphereEntityView(props: PhysicsCapsuleEntityViewProps) {

    const [ref, api] = useSphere(
        () => ({
            args: [1],
            mass: 1,
            position: props.node.position as any
        }),
        React.useRef<any>()
    )

    return (
        <mesh ref={ref} castShadow onPointerDown={() => api.velocity.set(0, 10, 0)}>
            <sphereGeometry args={[1, 1, 1]}/>
            <meshNormalMaterial/>
            {
                props.children
            }
        </mesh>
    )
}
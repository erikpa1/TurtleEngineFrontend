import {SceneEntity} from "@platform/entities/SceneEntity";
import {useBox, usePlane} from "@react-three/cannon";
import React from "react";
import {PhysicalBoxEntity} from "@platform/entities/physics/PhysicsBoxEntity";

export class PhysicalPlaneEntity extends SceneEntity {
    static TYPE = "physics.plane"


}

interface PhysicsPlaneEntityViewProps {
    node: PhysicalBoxEntity
    children?: any

}

export function PhysicsPlaneEntityView(props: PhysicsPlaneEntityViewProps) {

    const [ref] = usePlane(() => ({
        mass: 0, ...props,
        rotation: [-Math.PI / 2, 0, 0],
        position: props.node.position as any
    }), React.useRef<any>())

    return (
        <group ref={ref}>
            {
                React.Children.toArray(props.children)
            }
        </group>
    )
}
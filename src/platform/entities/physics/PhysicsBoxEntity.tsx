import {SceneEntity} from "@platform/entities/SceneEntity";
import {useBox} from "@react-three/cannon";
import React from "react";


export class PhysicalBoxEntity extends SceneEntity {
    static TYPE = "physics.box"

    ToJson(): any {
        return {
            ...super.ToJson(),
            type: PhysicalBoxEntity.TYPE
        }
    }


}


interface PhysicsBoxEntityViewProps {
    entity: PhysicalBoxEntity
    children: any

}

export function PhysicsBoxEntityView(props: PhysicsBoxEntityViewProps) {

    console.log("Pushing box entity")

    const [ref, api] = useBox(
        () => ({args: [1, 1, 1], mass: 1}),
        React.useRef<any>()
    )

    return (
        <mesh ref={ref} castShadow onPointerDown={() => api.velocity.set(0, 10, 0)}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshNormalMaterial/>
            {
                props.children
            }
        </mesh>
    )
}
import React from "react";
import {useCylinder, useSphere} from "@react-three/cannon";

import {SceneEntity} from "@platform/entities/SceneEntity";


import {PhysicalBoxEntity} from "@platform/entities/physics/PhysicsBoxEntity";
import {PerspectiveCamera, useKeyboardControls} from "@react-three/drei";
import {useFrame, useThree} from "@react-three/fiber";
import {VtsAvatarControls} from "@platform/entities/physics/PhysicsAvatarControls";

import * as three from "three"
import {Vector3} from "three";

export class PhysicalAvatarEntity extends SceneEntity {
    static TYPE = "physics.avatar"

    position = [0, 2, 0]

}

interface PhysicsAvatarEntityViewProps {
    node: PhysicalBoxEntity
    children?: any
}

export function PhysicsAvatarEntityView(props: PhysicsAvatarEntityViewProps) {

    const headGroup = React.useRef<any | three.Group>()


    const jumpPressed = useKeyboardControls((state) => state[VtsAvatarControls.jump])
    const forwardPressed = useKeyboardControls((state) => state[VtsAvatarControls.forward])
    const backwardPressed = useKeyboardControls((state) => state[VtsAvatarControls.back])
    const leftPressed = useKeyboardControls((state) => state[VtsAvatarControls.left])
    const rightPressed = useKeyboardControls((state) => state[VtsAvatarControls.right])

    const {camera} = useThree()

    useFrame((_, delta) => {

        const speed = 5


        if (jumpPressed) {
            api.velocity.set(0, 5, 0)
        }

        if (forwardPressed) {
            const direction = new Vector3(0, 0, speed * -1)
            direction.applyQuaternion(headGroup.current.quaternion)
            api.velocity.set(direction.x, direction.y, direction.z)
        }
        if (backwardPressed) {
            const direction = new Vector3(0, 0, speed * 1)
            direction.applyQuaternion(headGroup.current.quaternion)
            api.velocity.set(direction.x, direction.y, direction.z)
        }
        if (leftPressed) {
            const direction = new Vector3(speed * -1, 0, 0)
            direction.applyQuaternion(headGroup.current.quaternion)
            api.velocity.set(direction.x, direction.y, direction.z)
        }
        if (rightPressed) {
            const direction = new Vector3(speed * 1, 0, 0)
            direction.applyQuaternion(headGroup.current.quaternion)
            api.velocity.set(direction.x, direction.y, direction.z)
        }


    })


    const [ref, api] = useSphere(
        () => ({

            mass: 1,
            position: props.node.position as any,
            angularFactor: [0, 1, 0]
        }),
        React.useRef<any>()
    )

    React.useEffect(() => {
        //pass

    }, [])

    return (
        <group ref={ref} castShadow>

            <group ref={headGroup} position={[0, 2, 0]}>
                <PerspectiveCamera makeDefault/>
            </group>

            <mesh>
                <capsuleGeometry args={[0.5, 2]}/>
                <meshNormalMaterial/>
                {
                    props.children
                }
            </mesh>
        </group>

    )
}
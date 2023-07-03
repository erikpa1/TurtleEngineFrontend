import {SceneNode} from "@platform/scene/SceneNode";

import {Plane} from "@react-three/drei";
import * as three from "three";
import React from "react";
import {useMeshHover} from "@components/assets/tools/useMeshHover";
import SceneTransformHelper from "@components/assets/canvases/SceneTransformHelper";

import {useActiveNodeZus} from "@components/assets/scene-editor/scene-zuses";


const SCENE_MESH_MATERIAL = (
    <meshBasicMaterial
        transparent={true}
        side={three.DoubleSide}
        opacity={0.5}
        color={"red"}
        depthTest={false}
    />
)

interface SceneNodeMoverProps {
    children?: any
    node: SceneNode
}


export default function SceneNodeMover({children, node}: SceneNodeMoverProps) {

    const activeNodeZus = useActiveNodeZus()

    const planeRef = React.useRef<any>()

    const [hover] = useMeshHover()

    const [position, setPosition] = React.useState(node.position ?? [0, 0, 0])

    function gizmoMove(obj: three.Object3D, gizmoType: string) {
        const newPosition = [obj.position.x, obj.position.y, obj.position.z]

        setPosition([obj.position.x, obj.position.y, obj.position.z])

        node.position = newPosition

    }


    return (
        <>
            {
                activeNodeZus.activeNode === node && <SceneTransformHelper
                    gizmoType={activeNodeZus.gizmoType}
                    onValueChanged={gizmoMove}
                    position={position as any}
                />
            }

            <Plane
                ref={planeRef}
                scale={[0.5, 0.5, 0.5]}
                position={position as any}
                rotation={[Math.PI / -2, 0, 0]}

                renderOrder={0}
                onClick={(e) => {
                    activeNodeZus.setActiveNode(node)
                }}

                {
                    ...hover
                }>

                {
                    SCENE_MESH_MATERIAL
                }

            </Plane>

            <group position={position as any}>
                {
                    React.Children.toArray(children)
                }
            </group>

        </>

    )
}
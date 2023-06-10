import React from "react";

import {BoardHandlerIcon} from "@components/assets/boards/BoardHandlerIcon";
import IBoardHandlerProps from "@components/assets/boards/IBoardHandlerProps";
import {useMeshHover} from "@components/assets/tools/useMeshHover";
import * as three from "three";
import SceneTransformHelper from "@components/assets/canvases/SceneTransformHelper";


export function TeleportBoardEditHandler(props: IBoardHandlerProps) {

    const [hover] = useMeshHover()

    const [useGizmo, setUseGizmo] = React.useState(false)
    const [position, setPosition] = React.useState(props.position ?? [0, 0, 0])

    function gizmoMove(obj: three.Object3D, gizmoType: string) {
        setPosition([obj.position.x, obj.position.y, obj.position.z])
    }

    return (
        <>
            {
                useGizmo && <SceneTransformHelper
                    onValueChanged={gizmoMove}
                    position={position as any}
                />
            }

            <group
                {...{...props, position: position}}
                {...hover}
                onClick={() => {
                    setUseGizmo(!useGizmo)
                }}

            >
                <BoardHandlerIcon icon={"/board-icons/Spot.png"}/>
            </group>
        </>


    )
}

export function TeleportBoardHandler(props: IBoardHandlerProps) {

    return (
        <group {...props}>
            <BoardHandlerIcon icon={"/board-icons/Spot.png"}/>
        </group>


    )
}
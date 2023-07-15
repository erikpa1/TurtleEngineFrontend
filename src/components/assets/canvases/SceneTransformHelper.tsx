import React from "react";

import * as three from "three"

import {TransformControls} from "@react-three/drei";


export class GizmoTypes {
    static TRANSLATE = "translate"
    static SCALE = "scale"
    static ROTATE = "rotate"

}

interface SceneTransformHelperPorps {
    gizmoType?: string
    position: [number, number, number]
    onValueChanged: (positionObject: three.Object3D, gizmoType: string) => void
}


export function SceneTransformSingleton({position, valueChange}) {

    const gizmoRef = React.useRef<any>()

    const gizmoType = GizmoTypes.TRANSLATE

    const rotation = new three.Euler(0, 0, 0)

    const scale = new three.Vector3(1, 1, 1)

    const TCONTROLS: any = TransformControls


    return (
        <TCONTROLS
            ref={gizmoRef}
            mode={"translate"}
            showY={true}
            enabled={true}
            position={position as any}
            rotation={rotation as any}
            scale={scale as any}
            // matrixWorld={() => new three.Euler().fromArray(content.global_rotation)}
            onObjectChange={() => valueChange(GizmoTypes.TRANSLATE)}
            size={0.75}

        >

        </TCONTROLS>
    )
}


export default function SceneTransformHelper({
                                                 position,
                                                 onValueChanged,
                                                 gizmoType,
                                             }: SceneTransformHelperPorps) {


    const gizmoRef = React.useRef<any>()

    const _gizmoType = gizmoType ?? GizmoTypes.TRANSLATE

    const _position = new three.Vector3(position[0], position[1], position[2])
    const rotation = new three.Euler(0, 0, 0)
    const scale = new three.Vector3(1, 1, 1)

    console.log("Rendering")

    const valueChange = (gizmoType) => {
        const _obj: three.Object3D = gizmoRef.current.object

        if (_obj) {
            //Do nothing yet
            onValueChanged(_obj, gizmoType)
        }
    }
    const TCONTROLS: any = TransformControls

    return (
        <TCONTROLS
            ref={gizmoRef}
            mode={_gizmoType as any} showY={true} enabled={true}
            position={position}
            rotation={rotation}
            scale={scale}
            // matrixWorld={() => new three.Euler().fromArray(content.global_rotation)}
            onObjectChange={() => valueChange(GizmoTypes.TRANSLATE)}
            size={0.75}
        >

        </TCONTROLS>
    )
}
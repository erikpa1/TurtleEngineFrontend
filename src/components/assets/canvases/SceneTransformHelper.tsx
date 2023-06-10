import React from "react";

import * as three from "three"

import {Plane, TransformControls} from "@react-three/drei";


export class GizmoTypes {
    static TRANSLATE = "translate"
    static SCALE = "scale"
    static ROTATE = "rotate"

}

export default function SceneTransformHelper({}) {


    const gizmoRef = React.useRef<any>()

    const position = new three.Vector3(0, 0, 0)
    const rotation = new three.Euler(0, 0, 0)
    const scale = new three.Vector3(1, 1, 1)


    const valueChange = (gizmoType) => {
        const _obj: three.Object3D = gizmoRef.current.object

        if (_obj) {
            //Do nothing yet
        }


    }


    return (
        <TransformControls
            ref={gizmoRef}
            mode={"translate"} showY={true} enabled={true}
            position={position}
            rotation={rotation}
            scale={scale}
            // matrixWorld={() => new three.Euler().fromArray(content.global_rotation)}
            onObjectChange={() => valueChange(GizmoTypes.TRANSLATE)}
            size={0.75}

        >
            <Plane/>

        </TransformControls>
    )
}
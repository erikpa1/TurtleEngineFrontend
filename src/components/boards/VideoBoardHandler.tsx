import React from "react";
import {Plane} from "@react-three/drei";

export default function VideoBoardHandler({}) {
    return (
        <group position={[0, 0, 0]}>

            <Plane>
                <meshBasicMaterial color={"black"}/>
            </Plane>

        </group>
    )
}
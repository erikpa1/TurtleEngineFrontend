import React from "react";

import {Plane, Text, useTexture} from "@react-three/drei";
import * as three from "three";


interface BoardHandlerIconProps {
    icon: string
}

export function BoardHandlerIcon({icon}: BoardHandlerIconProps) {

    const texture = useTexture(icon)

    return (
        <group>
            <_BoardHandlerText text={"Vololoo"}/>
            <Plane>
                <meshBasicMaterial
                    map={texture}
                    transparent={true}
                    side={three.DoubleSide}
                />
            </Plane>
        </group>

    )
}

function _BoardHandlerText({text}) {

    const color = new three.Color()
    const fontProps = {
        font: '/fonts/Inter-Bold.woff',
        fontSize: 0.2,
        letterSpacing: -0.05,
        lineHeight: 1,
        'material-toneMapped': false
    }

    return (
        <Text
            position={[0, 0.8, 0]}
            {...fontProps}>
            My word
        </Text>


    )

}
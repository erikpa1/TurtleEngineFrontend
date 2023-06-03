import React from "react";
import {useLoader} from "@react-three/fiber";

import * as three from "three"


export default function MaterialSphere({textures}) {

    const sphereRef = React.useRef<any>()

    const repeatX = 4
    const repeatY = 2

    const base = useLoader(three.TextureLoader, textures.base)
    base.wrapS = three.RepeatWrapping
    base.wrapT = three.RepeatWrapping
    base.repeat.set(repeatX, repeatY)

    const normal = useLoader(three.TextureLoader, textures.normal)
    normal.wrapS = three.RepeatWrapping
    normal.wrapT = three.RepeatWrapping
    normal.repeat.set(repeatX, repeatY)

    const ao = useLoader(three.TextureLoader, textures.ao)
    ao.wrapS = three.RepeatWrapping
    ao.wrapT = three.RepeatWrapping
    ao.repeat.set(repeatX, repeatY)

    const metalness = useLoader(three.TextureLoader, textures.metalness)

    metalness.wrapS = three.RepeatWrapping
    metalness.wrapT = three.RepeatWrapping
    metalness.repeat.set(repeatX, repeatY)

    const rough = useLoader(three.TextureLoader, textures.rough)
    rough.wrapS = three.RepeatWrapping
    rough.wrapT = three.RepeatWrapping
    rough.repeat.set(repeatX, repeatY)


    return (
        <mesh ref={sphereRef} position={[0, 0.1, 0]} scale={[0.1, 0.1, 0.1]}>
            <sphereGeometry args={[1, 64, 64]}/>
            <meshPhysicalMaterial
                map={base}
                metalnessMap={metalness}
                aoMap={ao}
                normalMap={normal}
                roughnessMap={rough}
            />
        </mesh>
    )
}


import React from "react";
import {useLoader} from "@react-three/fiber";

import * as three from "three"
import FsTools from "@api/FsTools";
import MaterialData, {TurtlePhysicsMaterial} from "@platform/assets/material";
import {MeshPhysicalMaterial} from "three";


function _path(path: string) {
    return FsTools.ConvertFilePath(FsTools.GetPlatformPath(path))
}


const TEXTURES = {
    base: "Defaults/Assets/Material/Base.png",
    metalness: "Defaults/Assets/Material/Metalic.png",
    ao: "Defaults/Assets/Material/AO.png",
    normal: "Defaults/Assets/Material/Normal.png",
    rough: "Defaults/Assets/Material/Roughness.png",
}


function _useTextureLoader(textPath: string, defaultPath: string): three.Texture {

    const repeatX = 4
    const repeatY = 2

    const _textPath = _path(defaultPath)

    const tmp = useLoader(three.TextureLoader, _textPath)
    tmp.wrapS = three.RepeatWrapping
    tmp.wrapT = three.RepeatWrapping
    tmp.repeat.set(repeatX, repeatY)
    return tmp
}

interface _PhysicalMaterialMeshProps {
    material: TurtlePhysicsMaterial
}


export default function PhysicalMaterialMesh({material}: _PhysicalMaterialMeshProps) {

    const sphereRef = React.useRef<any>()

    const base = _useTextureLoader(material.base, TEXTURES.base)
    const normal = _useTextureLoader(material.normal, TEXTURES.normal)
    const ao = _useTextureLoader(material.ao, TEXTURES.ao)
    const metalness = _useTextureLoader(material.metalness, TEXTURES.metalness)
    const rough = _useTextureLoader(material.roughness, TEXTURES.rough)

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


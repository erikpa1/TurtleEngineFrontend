import PanoramaAsset from "@platform/assets/panorama";


import * as three from "three";
import {useTexture} from "@react-three/drei";
import FsTools from "@api/FsTools";

import React from "react";


export default function PhotoDom({panorama}: { panorama: PanoramaAsset }) {

    const texutre = useTexture(FsTools.ConvertFilePath(panorama.GetFullPanoramaPath()))

    return (
        <mesh visible={true} scale={[-1, 1, 1]}>
            <sphereGeometry args={[980, 64, 64]}/>
            <meshBasicMaterial
                side={three.BackSide}
                map={texutre}

            />

        </mesh>

    )
}

export function PhotoRawDom({path}: { path: string }) {

    const texutre = useTexture(FsTools.ConvertFilePath(path))

    return (
        <mesh visible={true} scale={[-1, 1, 1]}>
            <sphereGeometry args={[980, 64, 64]}/>
            <meshBasicMaterial
                side={three.BackSide}
                map={texutre}

            />

        </mesh>

    )
}

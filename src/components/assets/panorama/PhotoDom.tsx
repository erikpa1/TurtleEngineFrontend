import * as three from "three";
import {useTexture} from "@react-three/drei";
import FsTools from "@api/FsTools";

import React from "react";
import Asset from "@platform/assets/Asset";
import PanoramaAssetData from "@platform/assets/panorama";


export default function PhotoDom({asset}: { asset: Asset }) {

    const panorama: PanoramaAssetData = asset.data

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

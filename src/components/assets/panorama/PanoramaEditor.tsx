import React from "react";


import {useParams} from "react-router-dom";

import {MiddleSpinner} from "@components/Spinners";
import {Canvas} from "@react-three/fiber";
import {ContactShadows, Environment, OrbitControls} from "@react-three/drei";

import PanoramaAssetData from "@platform/assets/panorama";
import PanoramaEditorHud from "@components/assets/panorama/PanoramaEditorHud";

import PhotoDom from "@components/assets/panorama/PhotoDom";
import AssetsApi from "@api/AssetsApi";
import Asset from "@platform/assets/Asset";

export default function PanoramaEditor({}) {
    const {projectuid, panoramauid} = useParams()

    const _projectUid: string = projectuid ?? ""
    const _panoramaUid: string = panoramauid ?? ""

    const [asset, setAsset] = React.useState<Asset | null>(null)

    React.useEffect(() => {

        AssetsApi.GetAssetAndAssetData<PanoramaAssetData>(PanoramaAssetData, _projectUid, _panoramaUid).then((value) => {
            setAsset(value)
        })

    }, [_projectUid, _panoramaUid])

    if (asset) {
        return (
            <_PanoramaEditor asset={asset}/>
        )
    } else {
        return (
            <MiddleSpinner/>
        )
    }
}

interface _PanoramaEditorProps {
    asset: Asset
}


function _PanoramaEditor({asset}: _PanoramaEditorProps) {

    const panorama: PanoramaAssetData = asset.data

    return (
        <div style={{
            position: "relative"
        }}>


            <Canvas
                shadows
                className={"gl-canvas"}
                style={{
                    height: "100vh"
                }}
            >

                <PhotoDom asset={asset}/>

                <ambientLight/>

                <React.Suspense fallback={""}>
                    <Environment
                        preset={"sunset"}
                        ground={{height: 1, radius: 0}}
                    />
                </React.Suspense>


                <ContactShadows position={[0, -0.8, 0]} opacity={0.25} scale={10} blur={1.5} far={0.8}/>

                <OrbitControls makeDefault
                               target={[0, 0.15, 0]}
                               enableDamping={false}
                               maxPolarAngle={Math.PI / 2}
                />


                <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow/>

            </Canvas>

            <PanoramaEditorHud asset={asset}/>
        </div>
    )
}


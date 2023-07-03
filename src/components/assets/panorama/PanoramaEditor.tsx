import React from "react";


import {useParams} from "react-router-dom";

import {MiddleSpinner} from "@components/Spinners";
import {Canvas} from "@react-three/fiber";
import {ContactShadows, Environment, OrbitControls, useTexture} from "@react-three/drei";

import PanoramaAsset from "@platform/assets/panorama";
import PanoramaEditorHud from "@components/assets/panorama/PanoramaEditorHud";

import PhotoDom from "@components/assets/panorama/PhotoDom";
import AssetsApi from "@api/AssetsApi";
import PanoramaData from "@platform/assets/panorama";

export default function PanoramaEditor({}) {
    const {projectuid, panoramauid} = useParams()

    const _projectUid: string = projectuid ?? ""
    const _panoramaUid: string = panoramauid ?? ""

    const [panorama, setPanorama] = React.useState<PanoramaData | null>(null)

    React.useEffect(() => {

        AssetsApi.GetAssetData<PanoramaData>(PanoramaData, _projectUid, _panoramaUid).then((value) => {
            setPanorama(value)
        })

    }, [_projectUid, _panoramaUid])

    if (panorama) {
        return (
            <_PanoramaEditor panorama={panorama}/>
        )
    } else {
        return (
            <MiddleSpinner/>
        )
    }
}

interface _PanoramaEditorProps {
    panorama: PanoramaData
}


function _PanoramaEditor({panorama}: _PanoramaEditorProps) {
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

                <PhotoDom panorama={panorama}/>

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

            <PanoramaEditorHud panorama={panorama}/>
        </div>
    )
}


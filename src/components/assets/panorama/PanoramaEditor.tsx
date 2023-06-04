import React from "react";

import * as three from "three"

import {useParams} from "react-router-dom";

import AssetsApi from "@api/AssetsApi";
import {MiddleSpinner} from "@components/Spinners";
import {Canvas} from "@react-three/fiber";
import {ContactShadows, Environment, OrbitControls, useTexture} from "@react-three/drei";
import MeshEditorHud from "@components/assets/mesh-editor/MeshEditorHud";
import PanoramaAsset from "@platform/assets/PanoramaAsset";

export default function PanoramaEditor({}) {
    const {projectuid, panoramauid} = useParams()

    const _projectUid: string = projectuid ?? ""
    const _panoramaUid: string = panoramauid ?? ""

    const [panorama, setCloud] = React.useState<PanoramaAsset | null>(null)

    React.useEffect(() => {

        AssetsApi.GetAsset(PanoramaAsset, _projectUid, _panoramaUid).then((value) => {
            setCloud(value)
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
    panorama: PanoramaAsset
}


function _PanoramaEditor({panorama}: _PanoramaEditorProps) {
    return (
        <div style={{}}>


            <Canvas
                shadows
                className={"gl-canvas"}
                style={{
                    height: "100vh"
                }}
            >


                <_PhotoDom/>

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

            <MeshEditorHud/>

        </div>
    )
}

function _PhotoDom() {

    const texutre = useTexture("/dev/assets/panorama/tmp-panorama/Original.jpg")

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

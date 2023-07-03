import React from "react";
import {useParams} from "react-router-dom";

import AssetsApi from "@api/AssetsApi";
import {MiddleSpinner} from "@components/Spinners";
import {Canvas} from "@react-three/fiber";
import {ContactShadows, Environment, OrbitControls, Plane, useTexture} from "@react-three/drei";

import Area from "@platform/assets/area";

import AreaMarker from "@components/assets/area/AreaMarker";
import AreaEditorHud from "@components/assets/area-editor/AreaEditorHud";
import FsTools from "@api/FsTools";
import ErrorBoundary from "@components/ErrorBoundary";
import Assets from "@platform/assets/Assets";


export default function AreaEditor({}) {
    const {projectuid, areauid} = useParams()

    const _projectUid: string = projectuid ?? ""
    const _areaiud: string = areauid ?? ""

    const [area, setArea] = React.useState<Area | null>(null)

    React.useEffect(() => {

        // AssetsApi.GetAssetData<Area>(Assets.Area, _projectUid, _areaiud).then((value) => {
        //     setArea(value)
        // })

    }, [_projectUid, _areaiud])

    if (area) {
        return (
            <_AreaEditor area={area}/>
        )
    } else {
        return (
            <MiddleSpinner/>
        )
    }
}

interface _AreaEditorProps {
    area: Area
}

function _AreaEditor({area}: _AreaEditorProps) {
    return (
        <div style={{
            position: "relative"
        }}>


            <Canvas
                shadows
                className={"gl-canvas"}
                camera={{
                    far: 100000,
                    near: 0.0005
                }}

                style={{
                    height: "100vh"
                }}
            >
                <ambientLight/>

                <React.Suspense fallback={""}>
                    <Environment
                        preset={"sunset"}
                        ground={{radius: 0}}
                    />
                </React.Suspense>

                <ContactShadows position={[0, -0.8, 0]} opacity={0.25} scale={10} blur={1.5} far={0.8}/>

                <OrbitControls makeDefault
                               target={[0, 0.15, 0]}
                               enableDamping={false}
                               maxPolarAngle={Math.PI / 2}
                />

                <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow/>

                <_AreaPlane area={area}/>

                <AreaMarker position={[5, 0, 0]}/>
                <AreaMarker position={[4, 0, 3]}/>
                <AreaMarker position={[6, 0, 2]}/>
            </Canvas>

            <AreaEditorHud area={area}/>
        </div>
    )
}

interface _AreaPlaneProps {
    area: Area
}

function _AreaPlane({area}: _AreaPlaneProps) {


    return (
        <ErrorBoundary onError={<_SafeAreaPlane area={area}/>}>
            <_TryAreaPlane area={area}/>
        </ErrorBoundary>
    )
}

function _TryAreaPlane({area}) {

    const pathToTexture = area.GetMaximapPath()

    const texture = useTexture(FsTools.ConvertFilePath(pathToTexture))

    return (
        <Plane scale={[20, 20, 1]} position={[0, -0.01, 0]} rotation={[Math.PI / -2, 0, 0]}>
            <meshBasicMaterial
                map={texture}
            />
        </Plane>
    )
}

function _SafeAreaPlane({area}) {

    return (
        <Plane scale={[20, 20, 1]} position={[0, -0.01, 0]} rotation={[Math.PI / -2, 0, 0]}>
            <meshBasicMaterial/>
        </Plane>
    )
}




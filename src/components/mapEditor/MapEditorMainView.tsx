import React from "react"

import * as three from "three"

import {Canvas, useThree} from "@react-three/fiber";
import AreaPlane from "@components/mapEditor/AreaPlane";
import {MapControls} from "@react-three/drei";

export default function MapEditorMainView({}) {

    return (
        <div>
            <_MapEditorView/>
        </div>
    )
}

function _MapEditorView({}) {
    return (
        <Canvas style={{
            background: "gray",
            height: "100vh",
        }}
                className={"gl-canvas"}
                gl={{antialias: true}} dpr={window.devicePixelRatio}
                shadows>

            <_AreaWorld/>

        </Canvas>
    )
}

function _AreaWorld({}) {

    const {gl, camera} = useThree()

    React.useEffect(() => {

        const _camera: three.PerspectiveCamera = camera as any

        _camera.position.set(0, 200, 50)
        _camera.lookAt(0, 0, 0)
        _camera.far = 10000
        _camera.updateProjectionMatrix()
    }, [])

    return (
        <>
            <gridHelper position={[0, -0.0005, 0]} scale={100}/>
            <MapControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} enableDamping={false}/>

            <React.Suspense fallback={""}>
                <AreaPlane/>
            </React.Suspense>

            {/*<AreaSpotSphereGroup/>*/}
            <React.Suspense fallback={""}>

            </React.Suspense>

        </>
    )
}
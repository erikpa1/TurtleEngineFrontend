import React from "react";

import * as three from "three"
import {Canvas, useThree} from "@react-three/fiber"
import {ContactShadows, Environment, GizmoHelper, GizmoViewport, OrbitControls} from "@react-three/drei"


export default function SceneEditorMainView({}) {
    return (
        <div>
            <_SceneEditorMainView/>
        </div>
    )
}

function _SceneEditorMainView({}) {
    return (
        <Canvas
            shadows
            className={"gl-canvas"}
            style={{
                height: "100vh",
            }}
        >
            <ambientLight/>

            <React.Suspense fallback={""}>
                <Environment
                    preset={"sunset"}
                    ground={{height: 1, radius: 25}}
                />
            </React.Suspense>

            <ContactShadows position={[0, -0.8, 0]} opacity={0.25} scale={10} blur={1.5} far={0.8}/>

            <OrbitControls makeDefault
                           target={[0, 0, 0]}
                           enableDamping={false}
                           maxPolarAngle={Math.PI / 2}
            />

            <gridHelper position={[0, -0.0005, 0]} scale={0.1}/>

            <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow/>

            <GizmoHelper
                alignment="bottom-right" // widget alignment within scene-editor
                margin={[80, 80]} // widget margins (X, Y)
            >
                <GizmoViewport axisColors={['red', '#34eb37', '#347deb']} labelColor="black"/>
                {/* alternative: <GizmoViewcube /> */}
            </GizmoHelper>

            <_CameraConfig/>

        </Canvas>
    )
}

function _CameraConfig({}) {

    const {camera} = useThree()

    React.useEffect(() => {
        const _camera: three.PerspectiveCamera = camera as any
        _camera.position.set(0, 1.5, 1.5)
        _camera.lookAt(0, 0, 0)
        _camera.far = 100000
        _camera.near = 0.0005
        _camera.updateProjectionMatrix()

    }, [])


    return (
        <></>
    )
}
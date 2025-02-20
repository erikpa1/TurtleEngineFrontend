import React from "react"
import TurtleScene from "@data/project/Scene"
import {Canvas} from "@react-three/fiber"
import {ContactShadows, Environment, GizmoHelper, GizmoViewport, MapControls, OrbitControls} from "@react-three/drei"

interface SceneEditCanvasProps {
    scene: TurtleScene
}

export default function SceneEditCanvas({scene}: SceneEditCanvasProps) {

    return (
        <Canvas shadows className={"gl-canvas"}>
            <ambientLight/>

            <React.Suspense fallback={""}>
                <Environment
                    preset={"sunset"}
                    ground={{height: 1, radius: 25}}
                />
            </React.Suspense>

            <ContactShadows
                position={[0, -0.8, 0]}
                opacity={0.25} scale={10} blur={1.5} far={0.8}/>

            <MapControls makeDefault
                           target={[0, 0, 0]}
                           enableDamping={false}
                           maxPolarAngle={Math.PI / 2}
            />

            <gridHelper position={[0, -0.0005, 0]} scale={0.1}/>

            <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow/>

            <GizmoHelper
                alignment="bottom-right" // widget alignment within entities-editor
                margin={[80, 80]} // widget margins (X, Y)
            >
                <GizmoViewport axisColors={['red', '#34eb37', '#347deb']} labelColor="black"/>
                {/* alternative: <GizmoViewcube /> */}
            </GizmoHelper>


        </Canvas>
    )

}
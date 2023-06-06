import React from "react";
import {useParams} from "react-router-dom";

import AssetsApi from "@api/AssetsApi";
import {MiddleSpinner} from "@components/Spinners";
import {Canvas} from "@react-three/fiber";
import {ContactShadows, Environment, OrbitControls} from "@react-three/drei";
import MeshEditorHud from "@components/assets/mesh-editor/MeshEditorHud";

import PanoramaAsset from "@platform/assets/PanoramaAsset";
import SceneAsset from "@platform/assets/SceneAsset";
import VideoBoardHandler from "@components/boards/VideoBoardHandler";


interface PanoramaSceneEditorProps {
    scene: SceneAsset
}


export default function PanoramaSceneEditor({scene}: PanoramaSceneEditorProps) {
    return (
        <div style={{}}>


            <Canvas
                shadows
                className={"gl-canvas"}
                camera={{
                    far: 10000
                }}

                style={{
                    height: "100vh"
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
                               target={[0, 0.15, 0]}
                               enableDamping={false}
                               maxPolarAngle={Math.PI / 2}
                />

                <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow/>


                <_Components/>

            </Canvas>

            <MeshEditorHud/>

        </div>
    )
}

function _Components({}) {
    return (
        <VideoBoardHandler/>
    )
}

import React from "react";

import {Canvas} from "@react-three/fiber";
import {ContactShadows, Environment, OrbitControls} from "@react-three/drei";

import {TGui} from "@external/tgui";

import PointCloudEditorHud from "@components/assets/pointcould-editor/PointCloudEditorHud";
import {useLoadAssetFromParams} from "@components/assets/assets_hooks";
import Asset from "@platform/assets/Asset";
import PointCloudData from "@platform/assets/pointcloud";

export default function PointCloudEditor({}) {
    const asset = useLoadAssetFromParams()

    if (asset) {
        return (
            <_CloudEditor asset={asset}/>
        )
    } else {
        return (
            <TGui.MiddleSpinner/>
        )
    }
}

interface _CloudEditorProps {
    asset: Asset
}


function _CloudEditor({asset}: _CloudEditorProps) {

    const pointCloud: PointCloudData = asset.data

    return (
        <div style={{}}>


            <Canvas
                shadows
                className={"gl-canvas"}
                style={{
                    height: "100vh"
                }}
            >
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

            <PointCloudEditorHud asset={asset}/>

        </div>
    )
}

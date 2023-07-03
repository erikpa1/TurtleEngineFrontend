import React from "react";
import {useParams} from "react-router-dom";

import AssetsApi from "@api/AssetsApi";
import {MiddleSpinner} from "@components/Spinners";
import {Canvas} from "@react-three/fiber";
import {ContactShadows, Environment, OrbitControls} from "@react-three/drei";

import PointCloudAsset from "@platform/assets/pointcloud";
import PointCloudEditorHud from "@components/assets/pointcould-editor/PointCloudEditorHud";
import Assets from "@platform/assets/Assets";

export default function PointCloudEditor({}) {
    const {projectuid, clouduid} = useParams()

    const _projectUid: string = projectuid ?? ""
    const _cloudUid: string = clouduid ?? ""

    const [cloud, setCloud] = React.useState<PointCloudAsset | null>(null)

    React.useEffect(() => {

        // AssetsApi.GetAssetData(Assets.PointCloud, _projectUid, _cloudUid).then((value) => {
        //     setCloud(value)
        // })

    }, [_projectUid, _cloudUid])

    if (cloud) {
        return (
            <_CloudEditor cloud={cloud}/>
        )
    } else {
        return (
            <MiddleSpinner/>
        )
    }
}

interface _CloudEditorProps {
    cloud: PointCloudAsset
}


function _CloudEditor({cloud}: _CloudEditorProps) {
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

            <PointCloudEditorHud/>

        </div>
    )
}

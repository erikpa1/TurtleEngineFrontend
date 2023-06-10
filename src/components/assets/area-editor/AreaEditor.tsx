import React from "react";
import {useParams} from "react-router-dom";
import MeshAsset from "@platform/assets/MeshAsset";
import AssetsApi from "@api/AssetsApi";
import {MiddleSpinner} from "@components/Spinners";
import {Canvas} from "@react-three/fiber";
import {ContactShadows, Environment, OrbitControls, Plane, useTexture} from "@react-three/drei";
import MeshEditorHud from "@components/assets/mesh-editor/MeshEditorHud";
import AreaAsset from "@platform/assets/AreaAsset";
import {PrimitiveMesh} from "@components/assets/mesh/PrimitiveMesh";
import AreaSpot from "@components/assets/area/AreaSpot";


export default function AreaEditor({}) {
    const {projectuid, areauid} = useParams()

    const _projectUid: string = projectuid ?? ""
    const _meshuidUid: string = areauid ?? ""

    const [area, setArea] = React.useState<MeshAsset | null>(null)

    React.useEffect(() => {

        AssetsApi.GetAsset(AreaAsset, _projectUid, _meshuidUid).then((value) => {
            setArea(value)
        })

    }, [_projectUid, _meshuidUid])

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
    area: AreaAsset
}

function _AreaEditor({area}: _AreaEditorProps) {
    return (
        <div style={{}}>


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
                        ground={{radius: 1000}}
                    />
                </React.Suspense>

                <ContactShadows position={[0, -0.8, 0]} opacity={0.25} scale={10} blur={1.5} far={0.8}/>

                <OrbitControls makeDefault
                               target={[0, 0.15, 0]}
                               enableDamping={false}
                               maxPolarAngle={Math.PI / 2}
                />

                <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow/>

                <_AreaPlane/>

                <PrimitiveMesh meshPath={"/dev/assets/mesh/tmp-mesh/Default.glb"}/>
                <AreaSpot position={[5, 0, 0]}/>
                <AreaSpot position={[4, 0, 3]}/>
                <AreaSpot position={[6, 0, 2]}/>
            </Canvas>



        </div>
    )
}

function _AreaPlane({}) {

    const texture = useTexture("/dev/assets/area/tmp-area/Preview.png")

    return (
        <Plane scale={[20, 14, 1]} position={[0, -0.01, 0]} rotation={[Math.PI / -2, 0, 0]}>
            <meshBasicMaterial
                map={texture}
            />
        </Plane>
    )
}
import React from "react";

import Material from "@platform/assets/material";

import {MiddleSpinner} from "@components/Spinners";
import {useParams} from "react-router-dom";
import AssetsApi from "@api/AssetsApi";
import {process} from "@tauri-apps/api";
import {Canvas, useLoader, useThree} from "@react-three/fiber";
import {ContactShadows, Environment, GizmoHelper, GizmoViewport, OrbitControls, Sphere} from "@react-three/drei";
import {TGui} from "@external/tgui";
import {ViewContainer} from "@components/ViewContainer";

import * as three from "three"
import MaterialSphere from "@components/assets/material/MaterialEditorSphere";
import MaterialTextureCard from "@components/assets/material/MaterialTextureCard";
import Typography from "@mui/material/Typography";
import Assets from "@platform/assets/Assets";


const TEXTURES = {
    base: "/dev/assets/material/tmp-material/Base.png",
    metalness: "/dev/assets/material/tmp-material/Metalic.png",
    ao: "/dev/assets/material/tmp-material/AO.png",
    normal: "/dev/assets/material/tmp-material/Normal.png",
    rough: "/dev/assets/material/tmp-material/Roughness.png",
}


export default function MaterialEditor({}) {


    const {projectuid, materialuid} = useParams()

    const _projectUid: string = projectuid ?? ""
    const _materialUid: string = materialuid ?? ""

    const [material, setMaterial] = React.useState<Material | null>(null)

    React.useEffect(() => {

        // AssetsApi.GetAssetData(Assets.Material, _projectUid, _materialUid).then((value) => {
        //     setMaterial(value)
        // })

    }, [_projectUid, _materialUid])

    if (material) {
        return (
            <ViewContainer>
                <_MaterialEditor material={material}/>
            </ViewContainer>
        )
    } else {
        return (
            <MiddleSpinner/>
        )
    }

}

interface _MaterialEditorProps {
    material: Material
}

function _MaterialEditor({material}) {
    return (
        <div className={"hstack gap-3"}>

            <div className={"vstack gap-3"} style={{width: "750px"}}>

                <TGui.Card>

                    <TGui.CardContent style={{
                        height: "650px"
                    }}>
                        <_MaterialCanvas/>
                    </TGui.CardContent>

                    <TGui.CardContent>
                        <TGui.Typography gutterBottom variant="h5" component="div">
                            This is material name
                        </TGui.Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            style={{
                                minHeight: "50px",
                                maxHeight: "50px"
                            }}
                        >
                            This is material description
                        </Typography>

                    </TGui.CardContent>

                    <TGui.CardActions>
                        <TGui.Button label={"snapshot"}/>
                        <TGui.Button label={"clear"} color={"error"}/>
                    </TGui.CardActions>


                </TGui.Card>


            </div>

            <div className={"vstack gap-3"}>

                <MaterialTextureCard type={"base"} path={TEXTURES.base}/>
                <MaterialTextureCard type={"metalness"} path={TEXTURES.metalness}/>
                <MaterialTextureCard type={"rough"} path={TEXTURES.rough}/>
                <MaterialTextureCard type={"normal"} path={TEXTURES.normal}/>
                <MaterialTextureCard type={"ao"} path={TEXTURES.ao}/>

            </div>


        </div>
    )
}

function _MaterialCanvas({}) {


    return (
        <div style={{
            height: "100%"
        }}>

            <Canvas
                shadows
                className={"gl-canvas"}
            >
                <ambientLight/>

                <React.Suspense fallback={""}>
                    <Environment
                        preset={"park"}
                        ground={{height: 1, radius: 120}}
                    />
                </React.Suspense>

                <ContactShadows position={[0, -0.8, 0]} opacity={0.25} scale={10} blur={1.5} far={0.8}/>

                <OrbitControls makeDefault
                               target={[0, 0.15, 0]}
                               enableDamping={false}
                               maxPolarAngle={Math.PI / 2}
                />

                <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow/>

                <_InitCanvas/>

                <MaterialSphere textures={TEXTURES}/>

            </Canvas>
        </div>
    )
}


function _InitCanvas() {

    const {camera} = useThree()

    React.useEffect(() => {
        const _camera: three.PerspectiveCamera = camera as any
        _camera.position.set(0, 0.25, 0.15)
        _camera.lookAt(0, 0, 0)
        _camera.far = 100000
        _camera.near = 0.0005
        _camera.updateProjectionMatrix()

    }, [])

    return (
        <></>
    )
}

import React from "react";


import {Canvas, useThree} from "@react-three/fiber";
import {ContactShadows, Environment, OrbitControls} from "@react-three/drei";
import {TGui} from "@external/tgui";
import {ViewContainer} from "@components/ViewContainer";

import * as three from "three"
import PhysicalMaterialMesh from "@components/assets/material/MateriaFiberNodes";
import MaterialTextureCard from "@components/assets/material/MaterialTextureCard";
import Typography from "@mui/material/Typography";
import {useLoadAssetFromParams} from "@components/assets/assets_hooks";
import MaterialData, {MaterialTypes, TurtlePhysicsMaterial} from "@platform/assets/material";
import Asset from "@platform/assets/Asset";
import FsTools from "@api/FsTools";
import MaterialConfigWizard from "@components/assets/material/MaterialConfigWizard";
import AssetsApi from "@api/AssetsApi";
import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";


export default function MaterialEditor({}) {


    const asset = useLoadAssetFromParams()

    if (asset) {
        return (
            <ViewContainer>
                <_WizardDispatcher asset={asset}/>
            </ViewContainer>
        )
    } else {
        return (
            <TGui.MiddleSpinner/>
        )
    }

}


function _WizardDispatcher({asset}: _MaterialEditorProps) {

    const material: MaterialData = asset.data

    const [type, setType] = React.useState(material.type)

    console.log(type)

    if (type === MaterialTypes.UNDEFINED) {
        return (
            <MaterialConfigWizard material={material} onChanged={() => {
                setType(material.type)
            }}/>
        )
    } else {
        return (
            <_MaterialEditor asset={asset}/>
        )
    }
}

interface _MaterialEditorProps {
    asset: Asset
}


function _MaterialEditor({asset}: _MaterialEditorProps) {

    const [material, setMaterial] = React.useState([asset.data])

    const lock = useGlobalAppLock()

    function refresh() {
        setMaterial([asset.data])
    }

    async function savePressed() {
        lock.lock()
        await AssetsApi.UploadAssetData(asset.parent_project_uid, asset.uid, material[0].ToJson())
        lock.unlock()
    }

    return (
        <div className={"hstack gap-3"}>

            <div className={"vstack gap-3"} style={{width: "750px"}}>

                <TGui.Card>

                    <TGui.CardContent style={{
                        height: "650px"
                    }}>
                        <_MaterialCanvas material={material as any}/>
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
                        <TGui.Button label={"save"} onClick={savePressed}/>
                        <TGui.Button label={"snapshot"}/>
                        <TGui.Button label={"clear"} color={"error"}/>
                    </TGui.CardActions>

                </TGui.Card>


            </div>


            <div className={"vstack gap-3"}>
                <TGui.Switch condition={material[0].type}>
                    <TGui.Case value={MaterialTypes.PHYSICAL}>
                        <_PhysicalMaterialRightBar
                            material={material as any}
                            onRefresh={refresh}
                        />
                    </TGui.Case>
                </TGui.Switch>
            </div>


        </div>
    )
}


interface _PhysicalMaterialRightBarProps {
    material: TurtlePhysicsMaterial
    onRefresh: any
}

function _PhysicalMaterialRightBar({material, onRefresh}: _PhysicalMaterialRightBarProps) {

    function _path(path: string) {
        return FsTools.ConvertFilePath(FsTools.GetPlatformPath(path))
    }

    return (
        <>
            <MaterialTextureCard label={"base"} obj={material} variable={"base"} onRefresh={onRefresh}/>
            <MaterialTextureCard label={"metalness"} obj={material} variable={"metalness"} onRefresh={onRefresh}/>
            <MaterialTextureCard label={"roughness"} obj={material} variable={"roughness"} onRefresh={onRefresh}/>
            <MaterialTextureCard label={"normal"} obj={material} variable={"normal"} onRefresh={onRefresh}/>
            <MaterialTextureCard label={"ao"} obj={material} variable={"ao"} onRefresh={onRefresh}/>
        </>
    )


}


interface _MaterialCanvasProps {
    material: [TurtlePhysicsMaterial]
}

function _MaterialCanvas({material}: _MaterialCanvasProps) {


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

                <PhysicalMaterialMesh material={material[0]}/>

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

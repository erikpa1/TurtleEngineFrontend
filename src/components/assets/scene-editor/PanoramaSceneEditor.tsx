import React from "react";


import SceneApi from "@api/project/SceneApi";

import {
    UniversalMeshCanvas,
    UniversalWorldEnvironment,
    UniversalWorldGrid
} from "@components/assets/canvases/UniversalMeshCanvas";

import SceneCameraRotationGizmo from "@components/assets/canvases/SceneCameraRotationGizmo";

import SceneDefinitionDOM from "@components/assets/scene-editor/SceneDefinitionDOM";

import SceneEditorHud from "@components/assets/scene-editor/SceneEditorHud";
import PhotoDom, {PhotoRawDom} from "@components/assets/panorama/PhotoDom";
import PanoramaSceneDefinition from "@platform/assets/scenes/PanoramaSceneDefinition";
import PanoramaAsset from "@platform/assets/panorama";
import FsTools from "@api/FsTools";
import {OrbitControls} from "@react-three/drei";
import Asset from "@platform/assets/Asset";
import {useLoadAsset, useLoadAssetFromParams} from "@components/assets/assets_hooks";


interface PanoramaSceneEditorProps {
    asset: Asset
}

export default function PanoramaSceneEditor({asset}: PanoramaSceneEditorProps) {

    const [sceneDefinition, setSceneDefinition] = React.useState<[PanoramaSceneDefinition] | null>([asset.data])


    if (sceneDefinition) {
        return (
            <_PanoramaSceneEditor
                scene={asset}
                sceneDefinition={sceneDefinition[0]}
                onSceneDefinitionChanged={() => {
                    setSceneDefinition([asset.data])
                }}
            />
        )
    } else {
        return <></>
    }
}

interface _PanoramaSceneEditorProps {
    scene: Asset
    sceneDefinition: PanoramaSceneDefinition
    onSceneDefinitionChanged: () => void
}

function _PanoramaSceneEditor(props: _PanoramaSceneEditorProps) {


    return (
        <div style={{
            position: "relative"
        }}>

            <UniversalMeshCanvas>

                <UniversalWorldEnvironment/>
                <SceneCameraRotationGizmo/>
                {/*<SceneTransformHelper/>*/}

                {/*<_ExampleMeshes/>*/}

                <SceneDefinitionDOM sceneDefinition={props.sceneDefinition}/>

                <_PanoramaLoader
                    projectUid={props.scene.parent_project_uid}
                    panoramaUid={props.sceneDefinition.panorama_uid}
                />

                <OrbitControls makeDefault
                               target={[0, 0.15, 0]}
                               enableDamping={false}
                               maxPolarAngle={Math.PI / 2}
                />

                <UniversalWorldGrid height={-80}/>

            </UniversalMeshCanvas>

            <SceneEditorHud
                sceneDefinition={props.sceneDefinition}
                asset={props.scene}
                onSceneDefinitionChanged={props.onSceneDefinitionChanged}
            />

        </div>
    )
}

function _PanoramaLoader({projectUid, panoramaUid}) {


    if (panoramaUid && panoramaUid !== "") {
        return (
            <_PanoramaAssetLoader projectUid={projectUid} assetUid={panoramaUid}/>
        )
    } else {

        return (
            <PhotoRawDom path={FsTools.GetPlatformPath("Panoramas/PreviewPanorama.jpg")}/>
        )
    }
}


function _PanoramaAssetLoader({projectUid, assetUid}) {


    const asset = useLoadAsset(projectUid, assetUid)

    if (asset) {
        return (
            <PhotoDom asset={asset}/>
        )
    } else {
        return (<></>)
    }


}



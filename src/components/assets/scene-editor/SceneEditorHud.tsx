import React from "react";

import {AssetEditorHud} from "@components/assets/AssetEditorHud";

import OpenAssetFolderButton from "@components/assets/OpenAssetFolderButton";

import HudButton from "@components/assets/HudButton";

import SceneAsset from "@platform/assets/SceneAsset";

import {AssetDefinition, Assets} from "@platform/assets/Assets";
import {useGlobalPopup} from "@platform/zustands/globalPopupZus";
import {TGui} from "@external/tgui";
import {useTranslation} from "react-i18next";
import UniversalAssetList, {UniversalAssetListModes} from "@components/assets/UniversalAssetList";
import {useActiveProjectZus} from "@platform/zustands/projectZuses";
import VirtualSceneDefinition from "@platform/scene/VirtualSceneDefinition";
import SceneApi from "@api/project/SceneApi";
import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";
import {SceneNode} from "@platform/scene/SceneNode";


interface SceneEditorHudProps {
    scene: SceneAsset
    sceneDefinition: VirtualSceneDefinition
    onSceneDefinitionChanged: () => void
}

export default function SceneEditorHud(props: SceneEditorHudProps) {
    return (
        <>
            <_Bottom {...props}/>
            <_Top {...props}/>
            <_Left {...props}/>
            <_Right {...props}/>

        </>

    )
}

function _Bottom(props: SceneEditorHudProps) {


    const [t] = useTranslation()

    const popup = useGlobalPopup()
    const projectZus = useActiveProjectZus()

    function addAssetPressed(assetDefinition: AssetDefinition) {

        const offCanvas = (
            <TGui.Offcanvas
                closeEnabled={true}
                onClose={popup.popElement}
                width={"1000px"}
                header={<TGui.OffcanvasTitle>{"select"}</TGui.OffcanvasTitle>}
            >
                <UniversalAssetList
                    md={4}
                    assetDefinition={assetDefinition}
                    parentProjectUid={projectZus.project.uid}
                    mode={UniversalAssetListModes.SELECT}
                    onSelect={(asset) => {
                        props.sceneDefinition.AddAssetChildren(asset)
                        popup.popElement()
                        props.onSceneDefinitionChanged()
                    }}

                />
            </TGui.Offcanvas>
        )

        popup.pushElement(offCanvas)

    }

    return (
        <AssetEditorHud placement={"bottom"}>

            <HudButton
                lang={"scene"}
                icon={"/icons/Create.Mesh.svg"}
                onClick={() => addAssetPressed(Assets.Scene)}
            />

            <HudButton
                lang={"mesh"}
                icon={"/icons/Create.Mesh.svg"}
                onClick={() => addAssetPressed(Assets.Mesh)}
            />

            <HudButton
                lang={"video"}
                icon={"/icons/Create.Video.svg"}
                onClick={() => addAssetPressed(Assets.Video)}
            />

            <HudButton
                lang={"Pdf"}
                icon={"/icons/Create.Pdf.svg"}
            />
            <HudButton
                lang={"other"}
                icon={"/icons/Create.Other.svg"}
            />

        </AssetEditorHud>
    )
}

function _Top(props: SceneEditorHudProps) {

    const lock = useGlobalAppLock()

    function savePressed() {

        lock.lock()

        SceneApi.SaveSceneDefinition(
            props.scene.parent_project_uid,
            props.scene.uid,
            props.sceneDefinition
        ).then(() => {
            lock.unlock()

            console.log("Scene saved")

        })

    }

    return (
        <AssetEditorHud placement={"top"}>

            <OpenAssetFolderButton asset={props.scene}/>

            <HudButton
                icon={"/icons/Save.svg"}
                lang={"save"}
                onClick={savePressed}
            />

        </AssetEditorHud>
    )
}

function _Left(props: SceneEditorHudProps) {
    return (
        <AssetEditorHud placement={"left"}>

            <HudButton
                lang={"replace"}
                icon={"/icons/Map.svg"}
            />
            <HudButton
                lang={"edit"}
                icon={"/icons/Management.svg"}
            />

            <HudButton
                lang={"snapshot"}
                icon={"/icons/Management.svg"}
            />

        </AssetEditorHud>
    )
}

function _Right(props: SceneEditorHudProps) {

    function deleteSelectedPressed(node: SceneNode) {
        //pass
    }

    return (
        <AssetEditorHud placement={"right"}>

            <OpenAssetFolderButton asset={props.scene}/>

            <HudButton
                lang={"delete"}
                icon={"/icons/Delete.svg"}
            />
            <HudButton
                lang={"edit"}
                icon={"/icons/Management.svg"}
            />

        </AssetEditorHud>
    )
}



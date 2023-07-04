import React from "react";

import {AssetEditorHud} from "@components/assets/AssetEditorHud";

import OpenAssetFolderButton from "@components/assets/OpenAssetFolderButton";

import HudButton from "@components/assets/HudButton";


import Assets, {AssetDefinition,} from "@platform/assets/Assets";
import {useGlobalPopup} from "@platform/zustands/globalPopupZus";
import {TGui} from "@external/tgui";
import {useTranslation} from "react-i18next";
import UniversalAssetList, {UniversalAssetListModes} from "@components/assets/UniversalAssetList";
import {useActiveProjectZus} from "@platform/zustands/projectZuses";
import VirtualSceneDefinition from "@platform/assets/scenes/VirtualSceneDefinition";
import SceneApi from "@api/project/SceneApi";
import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";

import {useActiveNodeZus} from "@components/assets/scene-editor/scene-zuses";
import HudGizmoSwapper from "@components/assets/scene-editor/SceneGizmoSwapper";
import SceneNodesSelectionOffcanvas from "@components/assets/scene-editor/SceneNodesSelectionOffcanvas";
import Asset from "@platform/assets/Asset";


interface SceneEditorHudProps {
    scene: Asset
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

    function otherPressed() {
        const offCanvas = (
            <SceneNodesSelectionOffcanvas
                onHide={popup.popElement}
                onSelect={(asset) => {
                    props.sceneDefinition.AddAssetChildren(asset)
                    popup.popElement()
                    props.onSceneDefinitionChanged()
                }}
            />
        )

        popup.pushElement(offCanvas)
    }

    return (
        <AssetEditorHud placement={"bottom"}>

            <HudButton
                lang={"scene"}
                icon={"/icons/Scene.svg"}
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
                onClick={otherPressed}
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

            <_Compas/>

        </AssetEditorHud>
    )
}

function _Left(props: SceneEditorHudProps) {
    return (
        <AssetEditorHud placement={"left"}>

            <HudGizmoSwapper/>
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

    const useActiveNode = useActiveNodeZus()


    const activeNode = useActiveNode.activeNode

    function deleteSelectedPressed() {
        if (activeNode) {
            props.sceneDefinition.DeleteChildrenWithUid(activeNode.uid)
        }
    }


    return (
        <AssetEditorHud placement={"right"}>


            {
                activeNode && <>
                    <HudButton
                        lang={"delete"}
                        icon={"/icons/Delete.svg"}
                        onClick={deleteSelectedPressed}
                    />
                    <HudButton
                        lang={"edit"}
                        icon={"/icons/Management.svg"}
                    />

                </>
            }


        </AssetEditorHud>
    )
}


function _Compas({}) {
    return (
        <HudButton
            lang={"north"}
            icon={"/icons/Compas.svg"}
        />
    )
}


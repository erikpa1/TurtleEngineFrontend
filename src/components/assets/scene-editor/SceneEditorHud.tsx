import React from "react";

import {AssetEditorHud} from "@components/assets/AssetEditorHud";

import OpenAssetFolderButton from "@components/assets/OpenAssetFolderButton";

import HudButton from "@components/assets/HudButton";
import VirtualSceneDefinition from "@platform/assets/scenes/VirtualSceneDefinition";
import SceneApi from "@api/project/SceneApi";
import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";

import {useActiveNodeZus} from "@components/assets/scene-editor/scene-zuses";
import HudGizmoSwapper from "@components/assets/scene-editor/SceneGizmoSwapper";
import Asset from "@platform/assets/Asset";
import SceneEditorBottomBar from "@components/assets/scene-editor/SceneEditorBottomBar";
import {useGlobalPopup} from "@platform/zustands/globalPopupZus";
import SceneNodeEditOffcanvasDispatcher
    from "@components/assets/scene-editor/scene-nodes/SceneNodeEditOffcanvasDispatcher";


interface SceneEditorHudProps {
    scene: Asset
    sceneDefinition: VirtualSceneDefinition
    onSceneDefinitionChanged: () => void
}

export default function SceneEditorHud(props: SceneEditorHudProps) {
    return (
        <>
            <SceneEditorBottomBar {...props}/>
            <_Top {...props}/>
            <_Left {...props}/>
            <_Right {...props}/>

        </>

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

    const popup = useGlobalPopup()

    const useActiveNode = useActiveNodeZus()


    const activeNode = useActiveNode.activeNode

    function deleteSelectedPressed() {
        if (activeNode) {
            props.sceneDefinition.DeleteChildrenWithUid(activeNode.uid)
        }
    }


    function editPressed() {
        popup.pushElement(<SceneNodeEditOffcanvasDispatcher
                node={activeNode}
                onClose={popup.popElement}
            />
        )
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
                        onClick={editPressed}
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


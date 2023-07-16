import React from "react";
import Asset from "@platform/assets/Asset";
import VirtualSceneDefinition from "@platform/assets/scenes/VirtualSceneDefinition";
import {useTranslation} from "react-i18next";
import {useGlobalPopup} from "@platform/zustands/globalPopupZus";
import {useActiveProjectZus} from "@platform/zustands/projectZuses";
import Assets, {AssetDefinition} from "@platform/assets/Assets";
import {TGui} from "@external/tgui";
import UniversalAssetList, {UniversalAssetListModes} from "@components/assets/UniversalAssetList";
import SceneNodesSelectionOffcanvas from "@components/assets/scene-editor/SceneNodesSelectionOffcanvas";
import {AssetEditorHud} from "@components/assets/AssetEditorHud";
import HudButton from "@components/assets/HudButton";


interface SceneEditorHudProps {
    asset: Asset
    sceneDefinition: VirtualSceneDefinition
    onSceneDefinitionChanged: () => void
}

export default function SceneEditorBottomBar(props: SceneEditorHudProps) {

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
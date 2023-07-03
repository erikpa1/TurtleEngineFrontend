import React from "react";

import HudButton from "@components/assets/HudButton";

import {AssetEditorHud} from "@components/assets/AssetEditorHud";
import OpenAssetFolderButton from "@components/assets/OpenAssetFolderButton";
import Area from "@platform/assets/area";
import {useGlobalPopup} from "@platform/zustands/globalPopupZus";
import UniversalAssetList from "@components/assets/UniversalAssetList";
import Assets from "@platform/assets/Assets";
import {TGui} from "@external/tgui";
import TurtleOffcanvas from "@components/Drawers";
import {useTranslation} from "react-i18next";
import {Offcanvas} from "react-bootstrap";

interface AreaEditorHudProps {
    area: Area
}

export default function AreaEditorHud({area}: AreaEditorHudProps) {
    return (
        <>
            <_Bottom area={area}/>
            <_Top area={area}/>
            <_Left area={area}/>
            <_Right area={area}/>

        </>
    )
}

function _Bottom({area}: AreaEditorHudProps) {
    return (
        <AssetEditorHud placement={"bottom"}>

            <OpenAssetFolderButton asset={area}/>

            <HudButton
                lang={"replace"}
                icon={"/icons/Map.svg"}
            />
            <HudButton
                lang={"edit"}
                icon={"/icons/Management.svg"}
            />

        </AssetEditorHud>
    )
}


function _Top({area}: AreaEditorHudProps) {
    return (
        <AssetEditorHud placement={"top"}>
            <HudButton
                lang={"add.marker"}
                icon={"/icons/Map.svg"}
            />
            <HudButton
                lang={"add.marker"}
                icon={"/icons/Map.svg"}
            />
        </AssetEditorHud>
    )
}

function _Left({area}: AreaEditorHudProps) {
    return (
        <AssetEditorHud placement={"left"}>

            <HudButton
                lang={"mesh.layers"}
                icon={"/icons/Map.svg"}
            />

        </AssetEditorHud>
    )
}

function _Right({area}: AreaEditorHudProps) {

    const popupZus = useGlobalPopup()

    const [t] = useTranslation()

    function selectScenePressed() {

        popupZus.pushElement(
            <TurtleOffcanvas
                header={<Offcanvas.Title>{t("select.scene")}</Offcanvas.Title>}
                closeEnabled={true}
                width={"800px"}
                onClose={popupZus.popElement}>
                <UniversalAssetList
                    assetDefinition={Assets.Scene}
                    parentProjectUid={area.parent_project_uid}
                    md={1}

                />
            </TurtleOffcanvas>
        )
    }

    return (
        <AssetEditorHud placement={"right"}>
            <HudButton
                onClick={selectScenePressed}
                lang={"add.marker"}
                icon={"/icons/Spot.svg"}
            />
            <HudButton
                lang={"add.marker"}
                icon={"/icons/Map.svg"}
            />
        </AssetEditorHud>
    )
}

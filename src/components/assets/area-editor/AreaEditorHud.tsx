import React from "react";

import HudButton from "@components/assets/HudButton";

import {AssetEditorHud} from "@components/assets/AssetEditorHud";
import OpenAssetFolderButton from "@components/assets/OpenAssetFolderButton";

import {useGlobalPopup} from "@platform/zustands/globalPopupZus";

import {useTranslation} from "react-i18next";

import Asset from "@platform/assets/Asset";

interface AreaEditorHudProps {
    asset: Asset
}

export default function AreaEditorHud({asset}: AreaEditorHudProps) {
    return (
        <>
            <_Bottom asset={asset}/>
            <_Top asset={asset}/>
            <_Left asset={asset}/>
            <_Right asset={asset}/>

        </>
    )
}

function _Bottom({asset}: AreaEditorHudProps) {
    return (
        <AssetEditorHud placement={"bottom"}>

            <OpenAssetFolderButton asset={asset}/>

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


function _Top({asset}: AreaEditorHudProps) {
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

function _Left({asset}: AreaEditorHudProps) {
    return (
        <AssetEditorHud placement={"left"}>

            <HudButton
                lang={"mesh.layers"}
                icon={"/icons/Map.svg"}
            />

        </AssetEditorHud>
    )
}

function _Right({asset}: AreaEditorHudProps) {

    const popupZus = useGlobalPopup()

    const [t] = useTranslation()

    function selectScenePressed() {

        // popupZus.pushElement(
        //     <TurtleOffcanvas
        //         header={<Offcanvas.Title>{t("select.entities")}</Offcanvas.Title>}
        //         closeEnabled={true}
        //         width={"800px"}
        //         onClose={popupZus.popElement}>
        //         <UniversalAssetList
        //             assetDefinition={Assets.Scene}
        //             parentProjectUid={area.parent_project_uid}
        //             md={1}
        //
        //         />
        //     </TurtleOffcanvas>
        // )
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

import {AssetEditorHud} from "@components/assets/AssetEditorHud";
import OpenAssetFolderButton from "@components/assets/OpenAssetFolderButton";
import HudButton from "@components/assets/HudButton";
import React from "react";


export default function SceneEditorHud({}) {
    return (
        <>
            <_Bottom/>
            <_Top/>
            <_Left/>
            <_Right/>

        </>

    )
}

function _Bottom({}) {
    return (
        <AssetEditorHud placement={"bottom"}>

            <HudButton
                lang={"core.mesh"}
                icon={"/icons/Create.Mesh.svg"}
            />

            <HudButton
                lang={"core.video"}
                icon={"/icons/Create.Video.svg"}
            />

            <HudButton
                lang={"core.light"}
                icon={"/icons/Create.Pdf.svg"}
            />

            <HudButton
                lang={"core.other"}
                icon={"/icons/Management.svg"}
            />

            <HudButton
                lang={"core.other"}
                icon={"/icons/create.other.svg"}
            />

        </AssetEditorHud>
    )
}

function _Top({}) {
    return (
        <AssetEditorHud placement={"top"}>

            <HudButton
                icon={"/icons/Map.svg"}
            />

            <HudButton
                icon={"/icons/Map.svg"}
            />

            <HudButton
                icon={"/icons/Management.svg"}
            />

        </AssetEditorHud>
    )
}

function _Left({}) {
    return (
        <AssetEditorHud placement={"left"}>
            <OpenAssetFolderButton/>

            <HudButton
                lang={"core.replace"}
                icon={"/icons/Map.svg"}
            />
            <HudButton
                lang={"core.edit"}
                icon={"/icons/Management.svg"}
            />

            <HudButton
                lang={"core.snapshot"}
                icon={"/icons/Management.svg"}
            />

        </AssetEditorHud>
    )
}

function _Right({}) {
    return (
        <AssetEditorHud placement={"right"}>
            <OpenAssetFolderButton/>

            <HudButton
                lang={"core.replace"}
                icon={"/icons/Map.svg"}
            />
            <HudButton
                lang={"core.edit"}
                icon={"/icons/Management.svg"}
            />

        </AssetEditorHud>
    )
}
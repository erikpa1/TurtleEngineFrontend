import React from "react";

import {AssetEditorHud} from "@components/assets/AssetEditorHud";

import OpenAssetFolderButton from "@components/assets/OpenAssetFolderButton";

import HudButton from "@components/assets/HudButton";

import SceneAsset from "@platform/assets/SceneAsset";
import {Scene} from "three";


interface SceneEditorHudProps {
    scene: SceneAsset
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

function _Top(props: SceneEditorHudProps) {
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

function _Left(props: SceneEditorHudProps) {
    return (
        <AssetEditorHud placement={"left"}>


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

function _Right(props: SceneEditorHudProps) {
    return (
        <AssetEditorHud placement={"right"}>

            <OpenAssetFolderButton asset={props.scene}/>

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
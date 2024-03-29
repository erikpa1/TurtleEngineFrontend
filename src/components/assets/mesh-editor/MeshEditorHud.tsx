import React from "react";

import HudButton from "@components/assets/HudButton";

import {AssetEditorHud} from "@components/assets/AssetEditorHud";

import OpenAssetFolderButton from "@components/assets/OpenAssetFolderButton";


import {TGui} from "@external/tgui";
import EditMeshAssetOffcanvas from "@components/assets/mesh-editor/EditMeshAssetOffcanvas";
import ReplaceMeshOffcanvas from "@components/assets/mesh-editor/ReplaceMeshOffcanvas";

import {MeshAssetData} from "@platform/assets/mesh";
import Asset from "@platform/assets/Asset";

interface MeshEditorHud {
    asset: Asset
    onRefresh: any
}

export default function MeshEditorHud(props: MeshEditorHud) {

    const popup = TGui.PopupZus()

    function replaceMeshPressed() {
        popup.pushElement(<ReplaceMeshOffcanvas
            asset={props.asset}
            onClose={popup.popElement}
            onRefresh={props.onRefresh}/>
        )
    }

    function editAssetPressed() {

        popup.pushElement(<EditMeshAssetOffcanvas
            asset={props.asset}
            onClose={popup.popElement}
            onRefresh={props.onRefresh}/>
        )
    }

    return (
        <AssetEditorHud placement={"bottom"}>

            <OpenAssetFolderButton asset={props.asset}/>

            <HudButton
                lang={"replace"}
                icon={"/icons/Map.svg"}
                onClick={replaceMeshPressed}
            />
            <HudButton
                lang={"edit"}
                icon={"/icons/Management.svg"}
                onClick={editAssetPressed}
            />

        </AssetEditorHud>
    )
}
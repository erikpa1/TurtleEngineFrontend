import React from "react";

import HudButton from "@components/assets/HudButton";

import {AssetEditorHud} from "@components/assets/AssetEditorHud";

import OpenAssetFolderButton from "@components/assets/OpenAssetFolderButton";

import MeshAsset from "@platform/assets/MeshAsset";

import {TGui} from "@external/tgui";
import EditMeshAssetOffcanvas from "@components/assets/mesh-editor/EditMeshAssetOffcanvas";
import ReplaceMeshOffcanvas from "@components/assets/mesh-editor/ReplaceMeshOffcanvas";

interface MeshEditorHud {
    mesh: MeshAsset
}

export default function MeshEditorHud({mesh}: MeshEditorHud) {

    const popup = TGui.PopupZus()


    function replaceMeshPressed() {
        popup.pushElement(<ReplaceMeshOffcanvas
            mesh={mesh}
            onClose={popup.popElement}
            onRefresh={() => {

            }}/>
        )
    }

    function editAssetPressed() {

        popup.pushElement(<EditMeshAssetOffcanvas
            mesh={mesh}
            onClose={popup.popElement}
            onRefresh={() => {

            }}/>
        )
    }

    return (
        <AssetEditorHud placement={"bottom"}>

            <OpenAssetFolderButton asset={mesh}/>

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
import React from "react";
import MeshAsset from "@platform/assets/MeshAsset";

import {TGui} from "@external/tgui";
import {EditAssetDescriptionFormField, EditAssetNameFormField} from "@components/assets/parent/edit-parent-props";

interface EditMeshAssetOffcanvas {
    mesh: MeshAsset
    onClose: () => void,
    onRefresh: () => void
}

export default function EditMeshAssetOffcanvas({mesh, onClose, onRefresh}: EditMeshAssetOffcanvas) {

    const [t] = TGui.T()

    return (
        <TGui.Offcanvas
            closeEnabled={true}
            onClose={onClose}
            header={
                <TGui.OffcanvasTitle>
                    {t("core.edit")}
                </TGui.OffcanvasTitle>
            }
        >
            <TGui.Box>
                <TGui.Stack gap={3}>
                    <EditAssetNameFormField asset={mesh}/>
                    <EditAssetDescriptionFormField asset={mesh}/>
                </TGui.Stack>
            </TGui.Box>

        </TGui.Offcanvas>

    )
}
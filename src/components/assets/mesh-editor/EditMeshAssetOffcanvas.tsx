import React from "react";
import {MeshAssetData} from "@platform/assets/mesh";

import {TGui} from "@external/tgui";
import {EditAssetDescriptionFormField, EditAssetNameFormField} from "@components/assets/parent/edit-parent-props";
import Asset from "@platform/assets/Asset";

interface EditMeshAssetOffcanvas {
    asset: Asset
    onClose: () => void,
    onRefresh: () => void
}

export default function EditMeshAssetOffcanvas({asset, onClose, onRefresh}: EditMeshAssetOffcanvas) {

    const [t] = TGui.T()

    return (
        <TGui.Offcanvas
            closeEnabled={true}
            onClose={onClose}
            header={
                <TGui.OffcanvasTitle>
                    {t("edit")}
                </TGui.OffcanvasTitle>
            }
        >
            <TGui.Box>
                <TGui.Stack gap={3}>
                    {/*<EditAssetNameFormField asset={mesh}/>*/}
                    {/*<EditAssetDescriptionFormField asset={mesh}/>*/}
                </TGui.Stack>
            </TGui.Box>

        </TGui.Offcanvas>

    )
}
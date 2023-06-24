import React from "react";
import {TGui} from "@external/tgui";
import {EditAssetDescriptionFormField, EditAssetNameFormField} from "@components/assets/parent/edit-parent-props";
import MeshAsset from "@platform/assets/MeshAsset";
import FileMeshPreview from "@components/assets/mesh-editor/mesh-previews";


interface EditMeshAssetOffcanvas {
    mesh: MeshAsset
    onClose: () => void,
    onRefresh: () => void
}


export default function ReplaceMeshOffcanvas({mesh, onClose, onRefresh}: EditMeshAssetOffcanvas) {

    const [t] = TGui.T()


    return (
        <TGui.Offcanvas
            closeEnabled={true}
            onClose={onClose}
            header={
                <TGui.OffcanvasTitle>
                    {t("core.replace")}
                </TGui.OffcanvasTitle>
            }
        >
            <TGui.Box>
                <TGui.Stack gap={3}>


                    <TGui.Box>
                        <TGui.Tabs value={"glb"}>
                            <TGui.Tab label={"Glb"} value={"glb"}/>
                            <TGui.Tab label={"Gltf"} value={"gltf"}/>
                            <TGui.Tab label={"Fbx"} value={"fbx"}/>
                        </TGui.Tabs>
                    </TGui.Box>


                    <_GlbUpload/>

                </TGui.Stack>
            </TGui.Box>

        </TGui.Offcanvas>

    )
}


function _GlbUpload({}) {
    return (
        <>

            <TGui.SingleFileInput accept={".glb"}/>

            <FileMeshPreview/>

        </>
    )
}
import React from "react";
import {TGui} from "@external/tgui";
import {EditAssetDescriptionFormField, EditAssetNameFormField} from "@components/assets/parent/edit-parent-props";
import MeshAsset from "@platform/assets/MeshAsset";
import FileMeshPreview from "@components/assets/mesh-editor/mesh-previews";
import {Ext} from "@external/prelude";
import ConstantsApi from "@api/ConstantsApi";
import FsTools from "@api/FsTools";
import AssetsApi from "@api/AssetsApi";
import TauriAssetPlugin from "../../../tauri/plugin_assets";
import {UploadAssetFileParams} from "@editors/appmanagement/assets/CreateParams";
import {Assets} from "@platform/assets/Assets";


interface EditMeshAssetOffcanvas {
    mesh: MeshAsset
    onClose: () => void,
    onRefresh: () => void
}


export default function ReplaceMeshOffcanvas(props: EditMeshAssetOffcanvas) {

    const [t] = TGui.T()

    const [tabValue, setTabValue] = Ext.Cookie.useCookie("mesh-extension", "glb")

    const tabChanged = (e: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue)
    }

    return (
        <TGui.Offcanvas
            closeEnabled={true}
            onClose={props.onClose}
            header={
                <TGui.OffcanvasTitle>
                    {t("core.replace")}
                </TGui.OffcanvasTitle>
            }
        >
            <TGui.Box>
                <TGui.Stack gap={3}>


                    <TGui.Box
                        sx={{
                            borderBottom: 1,
                            borderColor: 'divider',
                            bgcolor: 'background.paper'
                        }}

                    >
                        <TGui.Tabs
                            value={tabValue}
                            variant={"scrollable"}
                            scrollButtons={"auto"}
                            onChange={tabChanged}
                        >
                            <TGui.Tab label={"Glb"} value={"glb"}/>
                            <TGui.Tab label={"Gltf"} value={"gltf"}/>
                            <TGui.Tab label={"Fbx"} value={"fbx"}/>
                        </TGui.Tabs>
                    </TGui.Box>

                    <TGui.Switch condition={tabValue}>
                        <TGui.Case value={"glb"}>
                            <_GlbUpload  {...props}/>
                        </TGui.Case>
                        <TGui.Case value={"gltf"}>

                        </TGui.Case>
                        <TGui.Case value={"fbx"}>

                        </TGui.Case>
                    </TGui.Switch>


                </TGui.Stack>
            </TGui.Box>

        </TGui.Offcanvas>

    )
}


function _GlbUpload(props: EditMeshAssetOffcanvas) {

    const [t] = TGui.T()

    const [meshPath, setMeshPath] = React.useState(FsTools.GetPlatformPath("Meshes/Default.glb"))

    function meshSelectedDesktop(path: string) {
        setMeshPath(meshPath)
    }

    function meshSelectedWeb(file: File) {
        //pass
    }


    function uploadPressed() {
        const params = new UploadAssetFileParams()
        params.path_from = meshPath
        params.folder = Assets.Mesh.FOLDER
        params.asset_type = Assets.Mesh.TYPE
        params.asset_uid = props.mesh.uid
        params.project_uid = props.mesh.parent_project_uid
        params.destination_name = "Default.glb"

        TauriAssetPlugin.UploadAssetFile(params)
    }

    return (
        <>

            <FileMeshPreview
                expectedExtension={"glb"}
                defaultMeshPath={FsTools.GetPlatformPath("Meshes/Default.glb")}
                onMeshSelectDesktop={meshSelectedDesktop}
                onMeshSelectWeb={meshSelectedWeb}
            />

            <TGui.Button
                variant={"outlined"}
                label={t("core.upload")}
                onClick={uploadPressed}
            />

        </>
    )
}
import React from "react";
import {TGui} from "@external/tgui";


import MeshFilePickView from "@components/assets/mesh-editor/mesh-previews";
import {Ext} from "@external/prelude";

import FsTools from "@api/FsTools";

import TauriOsPlugin from "../../../tauri/plugin_os";
import {MeshAssetData} from "@platform/assets/mesh";


interface EditMeshAssetOffcanvas {
    mesh: MeshAssetData
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
                    {t("replace")}
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
        setMeshPath(path)
    }

    function meshSelectedWeb(file: File) {
        //pass
    }


    function uploadPressed() {
        const uid = props.mesh.uid

        const projectUid = props.mesh._project_uid


        const toPath = FsTools.GetPathInProject(projectUid, `Assets/${uid}/Default.glb`)

        TauriOsPlugin.CopyFile(meshPath, toPath).then(props.onRefresh)

    }

    return (
        <>

            <MeshFilePickView
                expectedExtension={"glb"}
                defaultMeshPath={FsTools.GetPlatformPath("Meshes/Default.glb")}
                onMeshSelectDesktop={meshSelectedDesktop}
                onMeshSelectWeb={meshSelectedWeb}
            />

            <TGui.Button
                variant={"outlined"}
                label={t("upload")}
                onClick={uploadPressed}
            />

        </>
    )
}
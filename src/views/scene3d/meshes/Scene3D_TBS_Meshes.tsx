import React from "react";
import Stack from "@mui/material/Stack";
import TopBarButton from "@components/TopBarButton";
import Icons from "@icons/Icons";
import {useTranslation} from "react-i18next";
import {Drawer, Modal} from "@mui/material";
import FilesView, {AllFilesView} from "@views/files/FilesView";
import TurtleFile from "@api/project/files";
import ProjectApi from "@api/project/ProjectApi";

export default function Scene3D_TBS_Meshes({}) {
    return (
        <Stack direction={"row"}>
            <_AddMesh/>
        </Stack>
    )
}

function _AddMesh({}) {
    const [t] = useTranslation()
    const [show, setShow] = React.useState(false)

    return (
        <>
            <TopBarButton
                icon={Icons.Mesh}
                lang={t("add.mesh")}
                onClick={() => setShow(true)}
            />

            {show && <_AddMeshView onHide={() => setShow(false)}/>}
        </>
    )
}

function _AddMeshView({onHide}) {

    const [t] = useTranslation()

    const [isLoading, setIsLoading] = React.useState(false)
    const [files, setFiles] = React.useState<Array<TurtleFile>>([])

    async function refresh() {
        setIsLoading(true)
        const data = await ProjectApi.GetProjectFiles("", ["glb", "gltf"])
        setFiles(data)
        setIsLoading(false)
    }

    function meshPicked(file: TurtleFile) {

        console.log("Picked:", file)

    }

    React.useEffect(() => {
        refresh()
    }, [])

    return (
        <Drawer
            open={true}
            onClose={onHide}
            anchor={"bottom"}
            title={t("project.create") ?? ""}
        >
            <div style={{
                minHeight: "30em",
                padding: "25px"
            }}>
                <FilesView
                    files={files}
                    onPicked={meshPicked}
                />
            </div>
        </Drawer>
    )
}
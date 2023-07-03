import TurtleOffcanvas from "@components/Drawers";
import Button from "@mui/material/Button";
import React, {SyntheticEvent} from "react";

import ProjectApi from "@api/project/ProjectApi";
import {useTranslation} from "react-i18next";
import {Box, Stack, TextField} from "@mui/material";
import {CreateProjectParams} from "@api/project/params";
import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";

import {TurtleButton} from "@platform/components/TurtleButtons";
import {TurtleTextField} from "@platform/components/TurtleForms";
import {TGui} from "@external/tgui";
import FsTools from "@api/FsTools";
import PlatformDispatcher from "@api/PlatformDispatcher";
import {ImagePicker} from "@editors/appmanagement/assets/CreateAssetWithFileContent";
import ImagesApi from "@api/ImagesApi";

interface CreateProjectOffcanvasProps {
    onClose: () => void
    onRefresh: () => void

}

export default function CreateProjectOffcanvas({
                                                   onClose,
                                                   onRefresh
                                               }: CreateProjectOffcanvasProps) {

    const [t] = useTranslation()

    const inputRef = React.useRef<any>()

    const lock = useGlobalAppLock()

    const [preview, setPreview] = React.useState(FsTools.GetPlatformPath("Images/Previews/project-Preview.png"))

    const [cpp] = React.useState<CreateProjectParams | any>({
        name: "",
        author: "",
        description: "",
        project_type: "360",
        lat_lon: ""
    })

    const createProjectPressed = async () => {
        lock.lock()
        onClose()

        const newProjectUid = await ProjectApi.CreateProject(cpp)

        await ImagesApi.GeneratePreviewDesktop(preview, FsTools.GetPathInProject(newProjectUid, "Preview.png"), 512)

        lock.unlock()

        onRefresh && onRefresh()
    }

    const pNameChanged = (e: SyntheticEvent) => {
        cpp.name = e.target.value

    }

    const descChanged = (e: SyntheticEvent) => {
        cpp.description = e.target.value
    }

    const authorChanged = (e: SyntheticEvent) => {
        cpp.author = e.target.value
    }

    const latLonChanged = (e: SyntheticEvent) => {
        cpp.lat_lon = e.target.value
    }

    function imageSelectedDesktop(filePath: string) {
        if (filePath !== "") {
            setPreview(filePath)
        }

    }

    function imageSelectedWeb(event: any) {
    }


    return (
        <TurtleOffcanvas onClose={onClose}>

            <TGui.Box>
                <Stack spacing={2}>


                    <ImagePicker
                        image={preview}
                        imagePickedDesktop={imageSelectedDesktop}
                        imagePickedWeb={imageSelectedWeb}/>


                    <TurtleTextField
                        onChange={pNameChanged}
                        label={"project.name"}
                    />

                    <TurtleTextField
                        onChange={descChanged}
                        label={"project.description"}
                        multiline
                    />

                    <TurtleTextField
                        onChange={authorChanged}
                        label={"project.author"}
                    />

                    <TurtleTextField
                        onChange={latLonChanged}
                        label={"project.latlon"}
                    />

                </Stack>
            </TGui.Box>


            <TurtleButton
                onClick={createProjectPressed}
                label={"project.create"}
            />

        </TurtleOffcanvas>
    )
}
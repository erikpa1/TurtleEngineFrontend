import TurtleOffcanvas from "@components/Drawers";
import React from "react";

import ProjectApi from "@api/project/ProjectApi";
import {useTranslation} from "react-i18next";
import {Stack} from "@mui/material";
import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";

import {TurtleButton} from "@platform/components/TurtleButtons";
import {TurtleTextField} from "@platform/components/TurtleForms";
import {TGui} from "@external/tgui";
import FsTools from "@api/FsTools";
import {ImagePicker} from "@editors/appmanagement/assets/CreateAssetWithFileContent";
import ImagesApi from "@api/ImagesApi";
import PlatformDispatcher from "@api/PlatformDispatcher";
import {Project} from "@data/project/Project"

interface CreateProjectOffcanvasProps {
    onClose: () => void
    onRefresh?: () => void

}

export default function CreateProjectOffcanvas({
                                                   onClose,
                                                   onRefresh
                                               }: CreateProjectOffcanvasProps) {

    const [t] = useTranslation()

    const inputRef = React.useRef<any>()

    const lock = useGlobalAppLock()

    const [preview, setPreview] = React.useState(FsTools.GetPlatformPath("Images/Previews/project-Preview.png"))

    const [cpp] = React.useState(new Project())

    const createProjectPressed = async () => {
        lock.lock()
        onClose()

        const newProjectUid = await ProjectApi.CreateProject(cpp)

        if (PlatformDispatcher.IsDesktop()) {
            await ImagesApi.GeneratePreviewDesktop(preview, FsTools.GetPathInProject(newProjectUid, "Preview.png"), 512)
        } else {
            //TODO nahrat project preview na uid
        }

        lock.unlock()

        onRefresh && onRefresh()
    }

    const pNameChanged = (e: any) => {
        cpp.name = e.target.value

    }

    const descChanged = (e: any) => {
        cpp.description = e.target.value
    }

    const authorChanged = (e: any) => {
        cpp.author = e.target.value
    }


    function imageSelectedDesktop(filePath: string) {
        if (filePath !== "") {
            setPreview(filePath)
        }

    }

    function imageSelectedWeb(event: any) {
        //pass
    }


    return (
        <TurtleOffcanvas onClose={onClose}>


            <TGui.Box>
                <Stack spacing={2}>

                    <h5>{t("create.project")}:</h5>

                    <ImagePicker
                        image={preview}
                        imagePickedDesktop={imageSelectedDesktop}
                        imagePickedWeb={imageSelectedWeb}/>

                    <TurtleTextField
                        onChange={pNameChanged}
                        label={"project.name"}
                    />

                    {
                        PlatformDispatcher.IsDesktop() &&
                        <TurtleTextField
                            onChange={authorChanged}
                            label={"project.author"}
                        />
                    }


                    <TurtleTextField
                        onChange={descChanged}
                        label={"project.description"}
                        multiline
                    />


                </Stack>
            </TGui.Box>


            <div style={{
                marginTop: "15px",
                marginRight: "auto",
                marginLeft: "auto"
            }}>
                <TurtleButton
                    onClick={createProjectPressed}
                    label={"project.create"}
                />
            </div>


        </TurtleOffcanvas>
    )
}
import React from "react";

import {useTranslation} from "react-i18next";

import TurtleOffcanvas from "@components/Drawers";

import {Box, Stack} from "@mui/material";

import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";
import {Project} from "@data/project/Project";
import {useLoadProjectLight} from "@hooks/projectHooks";

import ProjectApi from "@api/project/ProjectApi";


import {TurtleButton} from "@platform/components/TurtleButtons";
import {TurtleTextField} from "@platform/components/TurtleForms";
import Modals from "@components/Modals";
import {Offcanvas} from "react-bootstrap";
import {TGui} from "@external/tgui";
import PlatformDispatcher from "@api/PlatformDispatcher";
import FsTools from "@api/FsTools";
import ImagesApi from "@api/ImagesApi";

interface EditProjectOffcanvasProps {
    uid: string
    onClose?: () => void
    onRefresh?: () => void

}

export default function EditProjectOffcanvas({
                                                 onClose,
                                                 onRefresh,
                                                 uid
                                             }: EditProjectOffcanvasProps) {


    const [t] = useTranslation()

    const [project, isLoading] = useLoadProjectLight(uid)

    return (
        <TurtleOffcanvas
            onClose={onClose}
            header={<Offcanvas.Title>{t("project.edit")}</Offcanvas.Title>}
            closeEnabled={true}
        >

            {
                (isLoading || !project) ? <TGui.MiddleSpinner/> : <_InnerContent
                    project={project}
                    onClose={onClose}
                    onRefresh={onRefresh}
                />
            }


        </TurtleOffcanvas>
    )
}

interface _InnerContentProps {
    project: Project
    onClose?: () => void
    onRefresh?: () => void

}

function _InnerContent({project, onClose, onRefresh}: _InnerContentProps) {

    const [t] = useTranslation()

    const lock = useGlobalAppLock()

    const inputRef = React.useRef<any>()

    const [coverPath, setCoverPath] = React.useState(FsTools.GetPathInProject(project.uid, "Preview.png"))

    const [name, setName] = React.useState(project.name)
    const [author, setAuthor] = React.useState(project.author)
    const [description, setDescription] = React.useState(project.description)
    const [latLon, setLatLon] = React.useState(project.lat_lon)


    const pNameChanged = (e: any) => {
        setName(e.target.value)
    }

    const descChanged = (e: any) => {
        setDescription(e.target.value)
    }

    const authorChanged = (e: any) => {
        setAuthor(e.target.value)
    }

    const latLonChanged = (e: any) => {
        setLatLon(e.target.value)
    }

    const editProjectPressed = () => {
        lock.lock()

        if (onClose) {
            onClose()
        }

        const params: any = {
            uid: project.uid,
            name: name,
            author: author,
            description: description,
            lat_lon: latLon,
            project_type: project.project_type
        }

        ProjectApi.UploadProjectLightData(params).then(() => {
            lock.unlock()

            if (onRefresh) {
                onRefresh()
            }

        })
    }

    const deleteProjectConfirmed = () => {
        lock.lock()


        ProjectApi.DeleteProject(project.uid).then(() => {
            lock.unlock()

            if (onRefresh) {
                onRefresh()
            }

            if (onClose) {
                onClose()
            }
        })
    }

    const deleteProjectPressed = () => {
        Modals.showYesNoModal({
            lang: "confirm.project.remove",
            onYes: deleteProjectConfirmed
        })
    }


    function selectImageClicked() {
        if (PlatformDispatcher.IsDesktop()) {
            PlatformDispatcher.OpenImageDialog().then((filePath) => {
                if (filePath !== "") {
                    setCoverPath(filePath)

                    ImagesApi.GeneratePreviewDesktop(filePath, FsTools.GetPathInProject(project.uid, "Preview.png"), 512)

                }

            })
        } else {
            const curr: any = inputRef.current
            curr.click()
        }

    }

    function imageSelected() {
        const curr: HTMLInputElement = inputRef.current as any
        console.log(curr.files)

    }

    return (
        <>
            <TGui.Box style={{padding: "15px"}}>
                <Stack spacing={2}>

                    <TGui.Card>
                        <TGui.CardMedia
                            sx={{height: 140}}
                            image={FsTools.ConvertFilePath(coverPath)}
                        />

                        <TGui.CardActions>
                            <TGui.Button
                                label={"replace"}
                                onClick={selectImageClicked}

                            />
                            <input
                                ref={inputRef}
                                onChange={imageSelected}
                                type={"file"}
                                hidden
                            />
                        </TGui.CardActions>
                    </TGui.Card>

                    <TurtleTextField
                        onChange={pNameChanged}
                        label={"project.name"}
                        value={name}
                    />

                    <TurtleTextField
                        label={"project.uid"}
                        value={project.uid}
                        disabled={true}
                    />

                    <TurtleTextField
                        onChange={descChanged}
                        value={description}
                        label={"project.description"}
                        multiline
                    />

                    <TurtleTextField
                        value={author}
                        onChange={authorChanged}
                        label={"project.author"}
                    />

                    <TurtleTextField
                        value={latLon}
                        onChange={latLonChanged}
                        label={"project.latlon"}
                    />


                    <Stack gap={1} direction={"row"}>
                        <TurtleButton
                            onClick={editProjectPressed}
                            label={"project.edit"}
                        />

                        <TurtleButton
                            onClick={deleteProjectPressed}
                            label={"project.delete"}
                            color={"error"}

                        />
                    </Stack>

                </Stack>


            </TGui.Box>


        </>

    )
}
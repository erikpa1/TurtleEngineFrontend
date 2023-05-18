import React, {SyntheticEvent} from "react";

import {useTranslation} from "react-i18next";

import TurtleDrawer from "@components/Drawers";
import Button from "@mui/material/Button";

import {Box, Stack, TextField} from "@mui/material";

import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";
import {ProjectLight} from "@data/project/ProjectLight";
import {useLoadProjectLight} from "@hooks/project";
import {MiddleSpinner} from "@components/Spinners";
import ProjectApi from "@api/project/ProjectApi";
import {CreateProjectParams} from "@api/project/data";

import {TurtleButton} from "@platform/components/TurtleButtons";
import {TurtleTextField} from "@platform/components/TurtleForms";

interface EditProjectDrawerProps {
    uid: string
    onClose?: () => void
    onRefresh?: () => void

}

export default function EditProjectDrawer({
                                              onClose,
                                              onRefresh,
                                              uid
                                          }: EditProjectDrawerProps) {


    const [project, isLoading] = useLoadProjectLight(uid)

    return (
        <TurtleDrawer onClose={onClose}>

            {
                (isLoading || !project) ? <MiddleSpinner/> : <_InnerContent
                    project={project}
                    onClose={onClose}
                    onRefresh={onRefresh}
                />
            }


        </TurtleDrawer>
    )
}

interface _InnerContentProps {
    project: ProjectLight
    onClose?: () => void
    onRefresh?: () => void

}

function _InnerContent({project, onClose, onRefresh}: _InnerContentProps) {

    const [t] = useTranslation()

    const lock = useGlobalAppLock()


    const [name, setName] = React.useState(project.name)
    const [author, setAuthor] = React.useState(project.author)
    const [description, setDescription] = React.useState(project.description)
    const [latLon, setLatLon] = React.useState(project.lat_lon)

    const editProjectPressed = () => {
        lock.lock()

        if (onClose) {
            onClose()
        }

        const params: CreateProjectParams = {
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

    const pNameChanged = (e: SyntheticEvent) => {
        setName(e.target.value)
    }

    const descChanged = (e: SyntheticEvent) => {
        setDescription(e.target.value)
    }

    const authorChanged = (e: SyntheticEvent) => {
        setAuthor(e.target.value)
    }

    const latLonChanged = (e: SyntheticEvent) => {
        setLatLon(e.target.value)
    }

    return (
        <>
            <Box style={{padding: "15px"}}>
                <Stack spacing={2}>

                    <TurtleTextField
                        onChange={pNameChanged}
                        label={"project.name"}
                        value={name}
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

                </Stack>
            </Box>

            <TurtleButton
                onClick={editProjectPressed}
                label={"project.edit"}
            />

        </>

    )
}
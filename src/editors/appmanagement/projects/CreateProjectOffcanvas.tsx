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

interface CreateProjectOffcanvasProps {
    onClose: () => void
    onRefresh: () => void

}

export default function CreateProjectOffcanvas({
                                                onClose,
                                                onRefresh
                                            }: CreateProjectOffcanvasProps) {

    const [t] = useTranslation()

    const lock = useGlobalAppLock()

    const [cpp] = React.useState<CreateProjectParams | any>({
        name: "",
        author: "",
        description: "",
        project_type: "360",
        lat_lon: ""
    })

    const createProjectPressed = () => {
        lock.lock()
        onClose()

        ProjectApi.CreateProject(cpp).then(() => {
            lock.unlock()
            onRefresh()
        })
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

    return (
        <TurtleOffcanvas onClose={onClose}>

            <Box style={{padding: "15px"}}>
                <Stack spacing={2}>

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
            </Box>


            <TurtleButton
                onClick={createProjectPressed}
                label={"project.create"}
            />

        </TurtleOffcanvas>
    )
}
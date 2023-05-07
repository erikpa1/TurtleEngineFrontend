import TurtleDrawer from "@components/Drawers";
import Button from "@mui/material/Button";
import React, {SyntheticEvent} from "react";

import ProjectApi from "@api/project/ProjectApi";
import {useTranslation} from "react-i18next";
import {Box, Stack, TextField} from "@mui/material";
import {CreateProjectParams} from "@api/project/data";
import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";

interface CreateProjectDrawer {
    onClose: () => void
    onRefresh: () => void

}

export default function CreateProjectDrawer({
                                                onClose,
                                                onRefresh
                                            }: CreateProjectDrawer) {

    const [t] = useTranslation()

    const lock = useGlobalAppLock()

    const [cpp] = React.useState<CreateProjectParams>({
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
        <TurtleDrawer onClose={onClose}>

            <Box style={{padding: "15px"}}>
                <Stack spacing={2}>

                    <TextField onChange={pNameChanged} label={t("project.name")}/>

                    <TextField onChange={descChanged} label={t("project.description")} multiline/>

                    <TextField onChange={authorChanged} label={t("project.author")}/>

                    <TextField onChange={latLonChanged} label={t("project.latlot")}/>

                </Stack>
            </Box>

            <Button onClick={createProjectPressed}>{t("project.create")}</Button>


        </TurtleDrawer>
    )
}
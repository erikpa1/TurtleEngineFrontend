import TurtleDrawer from "@components/Drawers";
import Button from "@mui/material/Button";
import React from "react";
import {CreateProjectParams} from "@api/project/data";
import ProjectApi from "@api/project/ProjectApi";
import {useTranslation} from "react-i18next";
import {Box, Stack, TextField} from "@mui/material";

export default function CreateProjectDrawer({onClose}) {

    const [t] = useTranslation()
    const createProjectPressed = () => {
        const tmp = new CreateProjectParams()
        ProjectApi.CreateProject(tmp)
    }

    return (
        <TurtleDrawer onClose={onClose}>

            <Box style={{padding: "15px"}}>
                <Stack spacing={2}>

                    <TextField label={t("project.name")}/>

                    <TextField label={t("project.description")} multiline/>

                    <TextField label={t("project.author")}/>

                    <TextField label={t("project.latlot")}/>


                </Stack>
            </Box>

            <Button onClick={createProjectPressed}>{t("project.create")}</Button>


        </TurtleDrawer>
    )
}
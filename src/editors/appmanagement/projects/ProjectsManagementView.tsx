import React from "react";
import Button from "@mui/material/Button";
import {CreateProjectParams} from "@api/project/data";
import ProjectApi from "@api/project/ProjectApi";


export default function ProjectsManagementView() {


    const createProjectPressed = () => {
        const tmp = new CreateProjectParams()

        ProjectApi.CreateProject(tmp)
    }

    return (
        <>


            <Button onClick={createProjectPressed}>Create</Button>

        </>
    )
}
import React from "react";
import Button from "@mui/material/Button";
import {CreateProjectParams} from "@api/project/params";
import ProjectApi from "@api/project/ProjectApi";
import {useGlobalPopup} from "@platform/zustands/globalPopupZus";
import CreateProjectDrawer from "@editors/appmanagement/projects/CreateProjectOffcanvas";
import {useTranslation} from "react-i18next";
import {TurtleButton} from "@platform/components/TurtleButtons";


export default function ProjectsManagementView() {

    const [t] = useTranslation()


    const popupZus = useGlobalPopup()


    const createProjectPressed = () => {

        popupZus.pushElement(
            <CreateProjectDrawer onClose={popupZus.popElement}/>
        )

    }

    return (
        <>

            <TurtleButton
                onClick={createProjectPressed}
                label={"project.create"}
            />


        </>
    )
}
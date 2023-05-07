import React from "react";
import Button from "@mui/material/Button";
import {CreateProjectParams} from "@api/project/data";
import ProjectApi from "@api/project/ProjectApi";
import {useGlobalPopup} from "@platform/zustands/globalPopupZus";
import CreateProjectDrawer from "@editors/appmanagement/projects/CreateProjectDrawer";
import {useTranslation} from "react-i18next";


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


            <Button onClick={createProjectPressed}>{t("project.create")}</Button>


        </>
    )
}
import React from "react";

import {useGlobalPopup} from "@platform/zustands/globalPopupZus";
import CreateProjectDrawer from "@editors/appmanagement/projects/CreateProjectOffcanvas";
import {useTranslation} from "react-i18next";
import {TurtleButton} from "@platform/components/TurtleButtons";
import ProjectsSelectionView from "@components/projects/ProjectsSelectionView";


export default function ProjectsManagementView() {

    const [t] = useTranslation()


    const popupZus = useGlobalPopup()


    const createProjectPressed = () => {

        popupZus.pushElement(
            <CreateProjectDrawer
                onClose={popupZus.popElement}
            />
        )

    }

    return (
        <div className={"vstack gap-3"}>

            <ProjectsSelectionView/>

            <div className={"hstack gap-3"} style={{
                marginTop: "25px"
            }}>
                <div style={{
                    marginLeft: "auto",
                    marginRight: "auto"
                }}>
                    <TurtleButton
                        onClick={createProjectPressed}
                        label={"project.create"}
                        variant={"outlined"}
                    />
                </div>
            </div>


        </div>
    )
}
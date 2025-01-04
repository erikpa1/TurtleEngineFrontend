import React from "react";
import {useTranslation} from "react-i18next";

import {Ext} from "@external/prelude";
import ProjectUniversalCard from "@components/projects/ProjectUniversalCard";
import {Col, Row, Spinner} from "react-bootstrap";
import UniversalInputSearchBar from "@components/SearchBar";
import {useAvailableProjects} from "@hooks/projectHooks";

import {useGlobalPopup} from "@platform/zustands/globalPopupZus";
import {TurtleButton} from "@platform/components/TurtleButtons";
import {TGui} from "@external/tgui";
import CreateProjectOffcanvas from "./CreateProjectOffcanvas";


export default function ProjectsSelectionView({}) {

    const [t] = useTranslation()

    const [projects, isLoading, refresh] = useAvailableProjects()

    const [tabValue, setTabValue] = Ext.Cookie.useCookie("projects-selection-tab-main", "0")

    const popupZus = useGlobalPopup()

    const tabChanged = (e: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue)
    }

    const createProjectPressed = () => {

        popupZus.pushElement(
            <CreateProjectOffcanvas
                onClose={popupZus.popElement}
                onRefresh={refresh}
            />
        )

    }

    if (isLoading) {
        return (
            <Spinner/>
        )
    } else {
        return (
            <>
                <div className={"vstack gap-2"}>

                    <div className={"hstack gap-1"}>


                        <UniversalInputSearchBar placeHolder={"search"}/>

                        <div
                            className={"hstack gap-3"} style={{
                            marginLeft: "auto"
                        }}>
                            <div style={{
                                marginLeft: "auto",
                                marginRight: "auto"
                            }}>
                                <TurtleButton
                                    onClick={createProjectPressed}
                                    label={"project.create"}

                                />
                            </div>
                        </div>

                    </div>


                    <TGui.Row xs={1} md={4} className="g-4">

                        {
                            projects.map((value) => {
                                return (
                                    <Col key={value.uid}>
                                        <ProjectUniversalCard
                                            project={value}
                                            onEdit={() => {
                                                alert("Unimplemented")
                                            }}/>
                                    </Col>
                                )
                            })
                        }

                    </TGui.Row>


                </div>

            </>


        )
    }


}


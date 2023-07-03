import React from "react";
import {useTranslation} from "react-i18next";

import {ViewContainer} from "@components/ViewContainer";


import {Box, Tab, Tabs} from "@mui/material";

import {Ext} from "@external/prelude";
import ProjectUniversalCard from "@components/projects/ProjectUniversalCard";
import {Col, Row, Spinner} from "react-bootstrap";
import UniversalInputSearchBar from "@components/SearchBar";
import {useAvailableProjects} from "@hooks/project";
import CreateProjectDrawer from "@editors/appmanagement/projects/CreateProjectOffcanvas";
import {useGlobalPopup} from "@platform/zustands/globalPopupZus";
import {TurtleButton} from "@platform/components/TurtleButtons";


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
            <CreateProjectDrawer
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


                    {/*<Box sx={{borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper'}}>*/}

                    {/*    <Tabs*/}
                    {/*        value={tabValue}*/}
                    {/*        onChange={tabChanged}*/}
                    {/*        aria-label="basic tabs example"*/}
                    {/*        centered*/}
                    {/*        textColor="inherit"*/}
                    {/*    >*/}
                    {/*        <Tab  label={t("local")} value={"0"}/>*/}
                    {/*        <Tab label={t("remote")} value={"1"}/>*/}
                    {/*    </Tabs>*/}

                    {/*</Box>*/}

                    <div style={{marginLeft: "auto", marginRight: "auto"}}>
                        <UniversalInputSearchBar placeHolder={"search"}/>
                    </div>

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

                    <Row xs={1} md={4} className="g-4">

                        {
                            projects.map((value) => {
                                return (
                                    <Col key={value.uid}>
                                        <ProjectUniversalCard project={value} onRefresh={refresh}/>
                                    </Col>
                                )
                            })
                        }

                    </Row>


                </div>

            </>


        )
    }


}


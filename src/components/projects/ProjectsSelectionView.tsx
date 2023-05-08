import React from "react";
import {useTranslation} from "react-i18next";

import {ViewContainer} from "@components/ViewContainer";

import {TabContext} from "@mui/lab";
import {Box, Grid, Paper, styled, Tab, Tabs} from "@mui/material";

import {Ext} from "@external/prelude";
import ProjectUniversalCard from "@components/projects/ProjectUniversalCard";
import {Col, Row, Spinner} from "react-bootstrap";
import UniversalInputSearchBar from "@components/SearchBar";
import {useAvailableProjects} from "@hooks/project";


export default function ProjectsSelectionView({}) {

    const [t] = useTranslation()

    const [projects, isLoading, refresh] = useAvailableProjects()

    const [tabValue, setTabValue] = Ext.Cookie.useCookie("projects-selection-tab-main", "0")

    const tabChanged = (e: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue)
    }

    if (isLoading) {
        return (
            <ViewContainer>
                <Spinner/>
            </ViewContainer>
        )
    } else {
        return (
            <ViewContainer>

                <div className={"vstack gap-3"}>

                    <Box sx={{borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper'}}>

                        <Tabs
                            value={tabValue}
                            onChange={tabChanged}
                            aria-label="basic tabs example"
                            centered
                            textColor="inherit"
                        >
                            <Tab label={t("core.local")} value={"0"}/>
                            <Tab label={t("core.remote")} value={"1"}/>
                        </Tabs>

                    </Box>

                    <div style={{marginLeft: "auto", marginRight: "auto"}}>
                        <UniversalInputSearchBar placeHolder={"core.search"}/>
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


            </ViewContainer>


        )
    }


}


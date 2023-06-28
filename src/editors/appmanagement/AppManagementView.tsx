import React from "react";
import {useTranslation} from "react-i18next";


import {Box, Tab, Tabs} from "@mui/material";

import {TabContext} from "@mui/lab";
import {ViewContainer} from "@components/ViewContainer";


import {Ext} from "@external/prelude";
import ProjectsManagementView from "@editors/appmanagement/projects/ProjectsManagementView";
import {TGui} from "@external/tgui";

export default function AppManagementView({}) {

    const [t] = useTranslation()


    const [tabValue, setTabValue] = Ext.Cookie.useCookie("appmanagement-tab-main", "0")

    const tabChanged = (e: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue)
    }

    return (
        <ViewContainer>
            <TabContext value={tabValue}>

                <Box
                    sx={{borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper'}}
                    className={"turtle-shaded-bar"}
                >

                    <Tabs
                        value={tabValue}
                        onChange={tabChanged}
                        aria-label="basic tabs example"
                        centered
                        textColor="inherit"
                    >
                        {/*<Tab label={t("projects")} value={"0"}/>*/}
                        <Tab label={t("users")} value={"1"}/>
                        <Tab label={t("deployment")} value={"2"}/>
                        <Tab label={t("licences")} value={"3"}/>
                    </Tabs>

                </Box>
            </TabContext>

            <TGui.Switch condition={tabValue}>
                {/*<TGui.Case value={"0"}><ProjectsManagementView/></TGui.Case>*/}
            </TGui.Switch>

        </ViewContainer>

    )
}
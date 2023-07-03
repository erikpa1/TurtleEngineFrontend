import React from "react";
import {ViewContainer} from "@components/ViewContainer";
import {TabContext} from "@mui/lab";
import {Box, Tab, Tabs} from "@mui/material";

import {Ext} from "@external/prelude";
import {TGui} from "@external/tgui";
import ProjectPlayerConfig from "@components/projects/configs/ProjectPlayerConfig";
import ProjectScenesEditorConfig from "@components/projects/configs/ProjectScenesEditorConfig";


export default function ProjectConfigView({}) {

    const [t] = TGui.T()


    const [tabValue, setTabValue] = Ext.Cookie.useCookie("project-config-tab-main", "0")

    const tabChanged = (e: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue)
    }

    return (
        <ViewContainer>

            <div className={"vstack gap-3"}>
                <TabContext value={tabValue}>

                    <TGui.Box
                        sx={{borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper'}}
                    >
                        <TGui.Tabs
                            value={tabValue}
                            onChange={tabChanged}
                            aria-label="Asset tabs"
                            textColor="inherit"
                        >
                            <Tab label={"player"} value={"0"}/>
                            <Tab label={"scene-editor"} value={"1"}/>
                        </TGui.Tabs>

                    </TGui.Box>
                </TabContext>

                <TGui.Switch condition={tabValue}>
                    <TGui.Case value={"0"}>
                        <ProjectPlayerConfig/>
                    </TGui.Case>
                    <TGui.Case value={"1"}>
                        <ProjectScenesEditorConfig/>
                    </TGui.Case>

                </TGui.Switch>
            </div>
        </ViewContainer>
    )
}



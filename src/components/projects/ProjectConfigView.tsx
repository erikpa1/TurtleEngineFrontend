import React from "react";
import {ViewContainer} from "@components/ViewContainer";
import {TabContext} from "@mui/lab";
import {Tab} from "@mui/material";

import {Ext} from "@external/prelude";
import {TGui} from "@external/tgui";

const ProjectPlayerConfig = React.lazy(() => import(  "@components/projects/configs/ProjectPlayerConfig"))
const ProjectScenesEditorConfig = React.lazy(() => import(  "@components/projects/configs/ProjectScenesEditorConfig"))
const VTSProjectConfigView = React.lazy(() => import(  "@components/projects/configs/VTSProjectConfigView"))
const LanguagesEditView = React.lazy(() => import( "@components/projects/LanguagesEditView"))


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
                            <Tab label={"languages"} value={"0"}/>
                            <Tab label={"player-guis"} value={"1"}/>
                            <Tab label={"vts"} value={"2"}/>
                            <Tab label={"entities-editor"} value={"3"}/>
                        </TGui.Tabs>

                    </TGui.Box>
                </TabContext>

                <TGui.Switch condition={tabValue}>
                    <TGui.Case value={"0"}>
                        <LanguagesEditView/>
                    </TGui.Case>
                    <TGui.Case value={"1"}>
                        <ProjectPlayerConfig/>
                    </TGui.Case>
                    <TGui.Case value={"2"}>
                        <VTSProjectConfigView/>
                    </TGui.Case>
                    <TGui.Case value={"3"}>
                        <ProjectScenesEditorConfig/>
                    </TGui.Case>

                </TGui.Switch>
            </div>
        </ViewContainer>
    )
}



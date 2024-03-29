import React from "react";
import {TabContext} from "@mui/lab";
import {TGui} from "@external/tgui";
import {Tab} from "@mui/material";
import {Ext} from "@external/prelude";

export default function ProjectScenesEditorConfig({}) {

    const [t] = TGui.T()

    const [tabValue, setTabValue] = Ext.Cookie.useCookie("project-config-tab-entities-editor", "0")

    const tabChanged = (e: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue)
    }

    return (
        <>
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
                        <Tab label={t("general")} value={"0"}/>
                        <Tab label={t("virtual-entities-editor")} value={"1"}/>
                        <Tab label={t("panorama-entities-editor")} value={"2"}/>
                        <Tab label={t("area-entities-editor")} value={"3"}/>
                        <Tab label={t("2d-entities-editor")} value={"4"}/>
                    </TGui.Tabs>

                </TGui.Box>
            </TabContext>


        </>

    )
}


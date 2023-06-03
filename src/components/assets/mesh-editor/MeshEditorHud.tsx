import React from "react";
import {TGui} from "@external/tgui";
import {Tab, Tabs} from "@mui/material";


export default function MeshEditorHud({}) {
    return (
        <div style={{
            position: "absolute",
            left: "50%",
            top: "10px"
        }}>

            <TGui.Box sx={{borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper'}}>

                <Tabs
                    aria-label="basic tabs example"
                    centered
                    textColor="inherit"
                >
                    <Tab label={"core.local"} value={"0"}/>
                    <Tab label={"core.local"} value={"1"}/>
                </Tabs>

            </TGui.Box>


        </div>
    )
}
import {TGui} from "@external/tgui";
import React from "react";
import {VtsPanelHeading} from "@players/vts/player-guis/Common";
import FsTools from "@api/FsTools";


export function MiddlePanel({}) {

    const [t] = TGui.T()

    return (

        <TGui.Card style={{
            backgroundColor: TGui.Colors.WhiteMiddle,
            padding: "0.5em",
            height: "100%"
        }}>

            <div style={{textAlign: "center"}}>
                <VtsPanelHeading text={t("preview")}/>
            </div>

            <TGui.Stack gap={3}>
                <TGui.Card>
                    <img
                        style={{
                            height: "500px",
                            width: "100%",
                            margin: "1em",
                            objectFit: "contain"
                        }}
                        src={FsTools.ConvertFilePath(FsTools.GetPlatformPath("Images/VtsDefaultPreview.png"))}
                    />
                </TGui.Card>

                <TGui.Card>
                    <div style={{height: "5em"}}>

                    </div>
                </TGui.Card>
            </TGui.Stack>


        </TGui.Card>

    )
}


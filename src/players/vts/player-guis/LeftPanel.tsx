import {TGui} from "@external/tgui";
import React from "react";
import {VtsPanelHeading} from "@players/vts/player-guis/Common";


export function LeftPanel({}) {

    const [t] = TGui.T()

    return (
        <TGui.Card
            style={{
                backgroundColor: TGui.Colors.WhiteMiddle,
                padding: "0.5em",
                height: "100%"
            }}
        >

            <TGui.Stack gap={2}>

                <VtsPanelHeading
                    text={`${t("training.materials")}:`}
                    icon={"/icons/Create.Pdf.svg"}
                />

                <_TrainingMaterials/>

                <VtsPanelHeading
                    text={`${t("roles")}:`}
                    icon={"/icons/Users.svg"}
                />

                <_Roles/>

            </TGui.Stack>


        </TGui.Card>


    )
}


function _TrainingMaterials({}) {

    const [t] = TGui.T()

    function videosClicked() {
        alert("Videos clicked")
    }

    function documentsClicked() {
        alert("Documents clicked")
    }

    return (
        <>
            <TGui.Card style={{
                cursor: "pointer"
            }}
                       onClick={videosClicked}

            >
                <TGui.Stack
                    gap={3}
                    direction={"horizontal"}
                    style={{margin: "1em"}}
                >
                    <TGui.IconClickButton
                        image={"/icons/Create.Video.svg"}
                        size={"2em"}
                    />
                    <TGui.Typography>
                        {t("videos")}
                    </TGui.Typography>

                </TGui.Stack>
            </TGui.Card>


            <TGui.Card style={{
                cursor: "pointer"
            }}
                       onClick={documentsClicked}

            >
                <TGui.Stack
                    gap={3}
                    direction={"horizontal"}
                    style={{margin: "1em"}}
                >
                    <TGui.IconClickButton
                        image={"/icons/Create.Pdf.svg"}
                        size={"2em"}
                    />
                    <TGui.Typography>
                        {t("documents")}
                    </TGui.Typography>

                </TGui.Stack>
            </TGui.Card>
        </>

    )
}

function _Roles({}) {

    const [t] = TGui.T()

    function roleSelectPressed() {
        alert("Roles clicked")
    }

    return (
        <>
            <TGui.Card style={{
                cursor: "pointer"
            }}
                       onClick={roleSelectPressed}
            >
                <TGui.Stack
                    gap={3}
                    direction={"horizontal"}
                    style={{margin: "1em"}}
                >
                    <TGui.IconClickButton
                        image={"/icons/Users.svg"}
                        size={"2em"}
                    />
                    <TGui.Typography>
                        {t("Role")}
                    </TGui.Typography>

                </TGui.Stack>
            </TGui.Card>
        </>
    )
}

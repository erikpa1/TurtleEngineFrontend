import {TGui} from "@external/tgui";
import React from "react";
import {VtsPanelHeading} from "@players/vts/player-guis/Common";


const MIN_LINE_HEIGHT = "2.5em"

export function RightPanel({}) {

    const [t] = TGui.T()

    return (

        <TGui.Card style={{
            backgroundColor: TGui.Colors.WhiteMiddle,
            padding: "0.5em",
            height: "100%"
        }}>

            <TGui.Stack gap={2}>
                <VtsPanelHeading
                    icon={"/icons/Time.svg"}
                    text={`${t("times")}:`}
                />

                <_TimesPanel/>

                <VtsPanelHeading
                    icon={"/icons/Time.svg"}
                    text={`${t("tasks")}:`}
                />

                <_TasksView/>

                <VtsPanelHeading
                    icon={"/icons/Alarm.svg"}
                    text={`${t("penalizations")}:`}
                />

                <_PenalisationsView/>
            </TGui.Stack>

        </TGui.Card>

    )
}

function _TimesPanel({}) {


    return (
        <TGui.Stack gap={2}>
            <_TimeLine lang={"vts.time.expected"} time={"00:15:00"}/>
            <_TimeLine lang={"vts.time.training"} time={"00:0:00"}/>
            <_TimeLine lang={"vts.time.penalisations"} time={"00:0:00"}/>
            <_TimeLine lang={"vts.time.total"} time={"00:0:00"}/>
        </TGui.Stack>
    )
}

function _TimeLine({lang, time}) {
    const [t] = TGui.T()

    return (
        <TGui.Card style={{
            padding: "0.75em"
        }}>
            <TGui.Row>
                <TGui.Col>
                    {t(lang)}
                </TGui.Col>
                :
                <TGui.Col>
                    {time}
                </TGui.Col>
            </TGui.Row>
        </TGui.Card>
    )
}

function _TasksView({}) {


    const tasks = [
        "A", "B", "C", "D"
    ]


    return (
        <TGui.Stack gap={2}>
            {
                tasks.map((value, index) => {
                    return (
                        <TGui.Card key={value} style={{
                            padding: "0.5em"
                        }}>
                            <TGui.Stack direction={"horizontal"} gap={2}>

                                <TGui.IconClickButton
                                    image={"/icons/Arrow.Up.svg"}
                                    size={"0.75em"}
                                />

                                <div>{index + 1}.</div>
                                <div>{value}</div>

                                <div style={{marginLeft: "auto"}}>
                                    <TGui.IconClickButton
                                        image={"/icons/Checkbox.Ok.svg"}
                                    />
                                </div>

                            </TGui.Stack>

                        </TGui.Card>
                    )
                })
            }
        </TGui.Stack>
    )
}

function _PenalisationsView({}) {


    const penalisations = [
        "A", "B", "C", "D", "E", "F", "G", "H"
    ]


    return (
        <TGui.Stack gap={2} style={{
        }}>
            {
                penalisations.map((value, index) => {
                    return (
                        <TGui.Card key={value} style={{
                            padding: "0.75em"
                        }}>
                            <TGui.Stack direction={"horizontal"} gap={1}>
                                <div>{index + 1}.</div>
                                <div>{value}</div>

                                <div style={{marginLeft: "auto"}}>
                                    20 s
                                </div>

                            </TGui.Stack>

                        </TGui.Card>
                    )
                })
            }
        </TGui.Stack>
    )
}

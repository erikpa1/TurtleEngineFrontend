import React from "react";
import {TGui} from "@external/tgui";
import {ViewContainer} from "@components/ViewContainer";


export default function VtsLevelPlayerView({}) {


    return (
        <div style={{
            margin: "2em"
        }}>
            <_VtsLevelPlayerView/>
        </div>
    )
}

const MIN_LINE_HEIGHT = "2.5em"

function _VtsLevelPlayerView({}) {
    return (
        <TGui.Stack gap={3}>
            <TGui.Card style={{backgroundColor: TGui.Colors.WhiteMiddle}}>
                <TGui.Typography>
                    <TGui.Tabs value={"0"} centered>
                        <TGui.Tab value={"0"} label={"Training name"}/>
                    </TGui.Tabs>
                </TGui.Typography>
            </TGui.Card>

            <TGui.Row>
                <TGui.Col xs={3} style={{
                    paddingRight: 0,
                }}>
                    <_LeftPanel/>
                </TGui.Col>

                <TGui.Col>
                    <_MiddlePanel/>
                </TGui.Col>

                <TGui.Col xs={3} style={{
                    paddingLeft: 0
                }}>
                    <_RightPanel/>
                </TGui.Col>
            </TGui.Row>

        </TGui.Stack>
    )
}

function _LeftPanel({}) {

    const [t] = TGui.T()

    return (
        <TGui.Card
            style={{
                backgroundColor: TGui.Colors.WhiteMiddle,
                padding: "0.5em"
            }}
        >

            <_Heading text={`${t("materials")}:`}/>

            <TGui.Card>
                <div style={{height: "250px"}}/>
            </TGui.Card>

            <TGui.Card>
                <div style={{height: "250px"}}/>
            </TGui.Card>
        </TGui.Card>


    )
}


function _MiddlePanel({}) {
    return (

        <TGui.Card style={{
            backgroundColor: TGui.Colors.WhiteMiddle,
            padding: "0.5em"
        }}>
            <TGui.Stack gap={3}>
                <TGui.Card>

                    <div style={{height: "500px"}}/>
                </TGui.Card>
                <TGui.Card>

                    <div style={{height: "5em"}}/>
                </TGui.Card>
            </TGui.Stack>


        </TGui.Card>

    )
}

function _RightPanel({}) {

    const [t] = TGui.T()

    return (

        <TGui.Card style={{
            backgroundColor: TGui.Colors.WhiteMiddle,
            padding: "0.5em"
        }}>

            <_Heading text={`${t("times")}:`}/>

            <_TimesPanel/>

            <_Heading text={`${t("tasks")}:`}/>

            <_TasksView/>

            <_Heading text={`${t("penalizations")}:`}/>

            <_PenalisationsView/>

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
            minHeight: MIN_LINE_HEIGHT
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
                            minHeight: MIN_LINE_HEIGHT
                        }}>
                            <TGui.Stack direction={"horizontal"}>
                                <div>{index + 1}</div>
                                <div>{value}</div>

                                <div style={{marginLeft: "auto"}}>
                                    X
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
        "A", "B", "C", "D"
    ]


    return (
        <TGui.Stack gap={2}>
            {
                penalisations.map((value, index) => {
                    return (
                        <TGui.Card key={value} style={{
                            minHeight: MIN_LINE_HEIGHT
                        }}>
                            <TGui.Stack direction={"horizontal"}>
                                <div>{index + 1}</div>
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


function _Heading({text}) {

    const [t] = TGui.T()

    return (
        <h4 style={{
            marginLeft: "0.5em",
            marginTop: "0.25em"
        }}>
            {text}
        </h4>
    )
}
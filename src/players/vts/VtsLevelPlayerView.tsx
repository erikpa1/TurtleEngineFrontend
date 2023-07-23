import React from "react";
import {TGui} from "@external/tgui";

import {LeftPanel} from "@players/vts/player-guis/LeftPanel";
import {RightPanel} from "@players/vts/player-guis/RightPanel";
import {MiddlePanel} from "@players/vts/player-guis/MiddlePanel";


export default function VtsLevelPlayerView({}) {

    return (
        <div style={{
            margin: "2em"
        }}>
            <_VtsLevelPlayerView/>
        </div>
    )
}


function _VtsLevelPlayerView({}) {
    return (
        <TGui.Stack gap={3}>
            <TGui.Card style={{backgroundColor: TGui.Colors.WhiteMiddle}}>
                <TGui.Tabs value={"0"} centered>
                    <TGui.Tab value={"0"} label={"Training name"}/>
                </TGui.Tabs>
            </TGui.Card>

            <TGui.Row style={{
                height: "100%"
            }}>
                <TGui.Col xs={3} style={{
                    paddingRight: 0,
                }}>
                    <LeftPanel/>
                </TGui.Col>

                <TGui.Col>
                    <MiddlePanel/>
                </TGui.Col>

                <TGui.Col xs={3} style={{
                    paddingLeft: 0
                }}>
                    <RightPanel/>
                </TGui.Col>
            </TGui.Row>

        </TGui.Stack>
    )
}






import React from "react";
import {TGui} from "@external/tgui";


export default function VTSProjectConfigView({}) {
    return (
        <>
            <TGui.Card>
                <TGui.Tabs value={"0"}>
                    <TGui.Tab label={"levels"} value={"0"}/>
                </TGui.Tabs>
            </TGui.Card>

            <_LevelsView/>

        </>
    )
}

function _LevelsView({}) {
    return (
        <TGui.Row>
            <TGui.Col xs={3}>
                <_LevelsList/>
            </TGui.Col>
            <TGui.Col>
                <_LevelConfig/>
            </TGui.Col>
        </TGui.Row>
    )
}

function _LevelsList({}) {
    return (
        <TGui.Card style={{backgroundColor: TGui.Colors.WhiteMiddle}}>
            XX
        </TGui.Card>

    )
}

function _LevelConfig({}) {
    return (
        <div>

        </div>
    )
}

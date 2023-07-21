import React from "react";
import {TGui} from "@external/tgui";
import Asset from "@platform/assets/Asset";


interface TrainingTaskSetEditViewProps {
    asset: Asset
}

export default function TrainingTaskSetEditView({asset}: TrainingTaskSetEditViewProps) {


    const [_asset, setAsset] = React.useState<[Asset]>([asset])

    function refresh() {
        setAsset([asset])
    }

    return (
        <TGui.Row>

            <TGui.Col xs={4}>
                <_TasksList asset={_asset} onFullRefresh={refresh}/>
            </TGui.Col>

            <TGui.Col>
                <_TasksEditList asset={_asset} onFullRefresh={refresh}/>
            </TGui.Col>

        </TGui.Row>
    )
}

interface _TasksListProps {
    asset: [Asset]
    onFullRefresh: any
}

function _TasksList({asset}: _TasksListProps) {

    const _asset = asset[0]

    return (
        <TGui.Card style={{backgroundColor: TGui.Colors.WhiteMiddle}}>
            <div>A</div>
            <div>B</div>
            <div>C</div>
            <div>D</div>
        </TGui.Card>
    )
}

function _TasksEditList({asset}: _TasksListProps) {
    return (
        <TGui.Stack gap={3}>
            <TGui.Card style={{backgroundColor: TGui.Colors.WhiteMiddle}}>
                A
                B
                C
            </TGui.Card>

        </TGui.Stack>
    )
}
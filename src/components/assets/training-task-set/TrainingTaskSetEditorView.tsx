import React from "react";
import {TGui} from "@external/tgui";
import {MiddleSpinner} from "@components/Spinners";
import Asset from "@platform/assets/Asset";


import {useLoadAssetFromParams} from "@components/assets/assets_hooks";


export default function TrainingTaskSetEditorView({}) {

    const asset = useLoadAssetFromParams()

    if (asset) {
        return (
            <_TaskSetEditor asset={asset}/>
        )
    } else {
        return (
            <MiddleSpinner/>
        )
    }


}

interface _TaskSetEditorProps {
    asset: Asset
}

function _TaskSetEditor({asset}: _TaskSetEditorProps) {
    return (
        <TGui.ViewContainer>

            <TGui.Tabs>

            </TGui.Tabs>


        </TGui.ViewContainer>
    )
}
import React from "react";
import {useLoadAssetFromParams} from "@components/assets/assets_hooks";
import {TGui} from "@external/tgui";

export default function DataInstanceEditor() {

    const asset = useLoadAssetFromParams()

    if (asset) {
        return (
            <_DataInstanceEditor asset={asset}/>
        )
    } else {
        return (
            <TGui.MiddleSpinner/>
        )
    }

}

function _DataInstanceEditor({asset}) {
    return (
        <>
            Unimplemented</>
    )
}
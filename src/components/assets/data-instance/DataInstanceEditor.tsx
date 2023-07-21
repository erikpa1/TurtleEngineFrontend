import React from "react";
import {useLoadAssetFromParams} from "@components/assets/assets_hooks";
import {MiddleSpinner} from "@components/Spinners";

export default function DataInstanceEditor() {

    const asset = useLoadAssetFromParams()

    if (asset) {
        return (
            <_DataInstanceEditor asset={asset}/>
        )
    } else {
        return (
            <MiddleSpinner/>
        )
    }

}

function _DataInstanceEditor({asset}) {
    return (
        <>
            Unimplemented</>
    )
}
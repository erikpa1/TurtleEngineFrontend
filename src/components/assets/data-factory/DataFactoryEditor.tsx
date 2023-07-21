import React from "react";

import {ViewContainer} from "@components/ViewContainer";
import {MiddleSpinner} from "@components/Spinners";
import Datafactory from "@platform/assets/datafactory";
import Asset from "@platform/assets/Asset";
import {useLoadAssetFromParams} from "@components/assets/assets_hooks";

export default function DataFactoryEditor() {

    const asset = useLoadAssetFromParams()

    if (asset) {
        return (
            <ViewContainer>
                <_DataFactoryView asset={asset}/>
            </ViewContainer>
        )
    } else {
        return (
            <MiddleSpinner/>
        )
    }
}

function _DataFactoryView({asset}: { asset: Asset }) {
    return (
        <>
            Unimplemented
        </>
    )
}
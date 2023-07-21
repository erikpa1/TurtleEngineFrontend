import React from "react";

import {ViewContainer} from "@components/ViewContainer";

import Asset from "@platform/assets/Asset";
import {useLoadAssetFromParams} from "@components/assets/assets_hooks";
import {TGui} from "@external/tgui";

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
            <TGui.MiddleSpinner/>
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
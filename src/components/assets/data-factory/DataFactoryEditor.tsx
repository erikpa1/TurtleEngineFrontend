import React from "react";
import {useParams} from "react-router-dom";
import QuizAsset from "@platform/assets/quiz";
import AssetsApi from "@api/AssetsApi";
import {ViewContainer} from "@components/ViewContainer";
import {MiddleSpinner} from "@components/Spinners";
import Datafactory from "@platform/assets/datafactory";
import Assets from "@platform/assets/Assets";

export default function DataFactoryEditor() {
    const {projectuid, datafactoryuid} = useParams()

    const _projectUid: string = projectuid ?? ""

    const _dataFactoryUid: string = datafactoryuid ?? ""

    const [factory, setFactory] = React.useState<QuizAsset | null>(null)

    React.useEffect(() => {

        // AssetsApi.GetAssetData<Datafactory>(Assets.DataFactory, _projectUid, _dataFactoryUid).then((value) => {
        //     setFactory(value)
        // })

    }, [_projectUid, _dataFactoryUid])

    if (factory) {
        return (
            <ViewContainer>
                <_DataFactoryView factory={factory}/>
            </ViewContainer>
        )
    } else {
        return (
            <MiddleSpinner/>
        )
    }
}

function _DataFactoryView({factory}: { factory: Datafactory }) {
    return (
        <>
        </>
    )
}
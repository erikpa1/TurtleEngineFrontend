import React from "react";
import {TGui} from "@external/tgui";
import {MiddleSpinner} from "@components/Spinners";
import Asset from "@platform/assets/Asset";
import {useParams} from "react-router-dom";
import AssetsApi from "@api/AssetsApi";
import TrainingTaskSetData from "@platform/assets/trainingTaskSetData";


export default function TrainingTaskSetEditorView({}) {

    const {projectuid, trainingtaskuid}: any = useParams()

    const [asset, setAsset] = React.useState<Asset | null>(null)

    React.useEffect(() => {
        AssetsApi.GetAssetAndAssetData<TrainingTaskSetData>(
            TrainingTaskSetData,
            projectuid,
            trainingtaskuid).then(value => setAsset(value))
    }, [])

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
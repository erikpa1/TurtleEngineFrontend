import React from "react";
import {TGui} from "@external/tgui";

import Asset from "@platform/assets/Asset";


import {useLoadAssetFromParams} from "@components/assets/assets_hooks";
import TaskSetEditView from "@components/assets/training-task-set/TrainingTaskSetEditView";
import TrainingTaskSetPreviewView from "@components/assets/training-task-set/TrainingTaskSetPreviewView";
import AssetsApi from "@api/AssetsApi";
import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";


export default function TrainingTaskSetEditorView({}) {

    const asset = useLoadAssetFromParams()

    if (asset) {
        return (
            <_TaskSetEditor asset={asset}/>
        )
    } else {
        return (
            <TGui.MiddleSpinner/>
        )
    }


}

interface _TaskSetEditorProps {
    asset: Asset
}

function _TaskSetEditor({asset}: _TaskSetEditorProps) {

    const [t] = TGui.T()

    const lock = useGlobalAppLock()

    const [viewType, setViewType] = React.useState("edit")


    async function savePressed() {
        lock.lock()

        await AssetsApi.UploadAssetData(asset.parent_project_uid, asset.uid, asset.data)

        lock.unlock()
    }

    return (
        <TGui.ViewContainer>

            <TGui.Button
                label={"save"}
                onClick={savePressed}
            />

            <TGui.Stack gap={3}>
                <TGui.Card>
                    <TGui.Tabs
                        value={viewType}
                        onChange={(_, value) => setViewType(value)}
                        centered
                    >
                        <TGui.Tab label={"edit"} value={"edit"}/>
                        <TGui.Tab label={"view"} value={"view"}/>
                    </TGui.Tabs>
                </TGui.Card>

                <TGui.Switch condition={viewType}>
                    <TGui.Case value={"edit"}>
                        <TaskSetEditView asset={asset}/>
                    </TGui.Case>
                    <TGui.Case value={"view"}>
                        <_PreviewMode asset={asset}/>
                    </TGui.Case>
                </TGui.Switch>

            </TGui.Stack>


        </TGui.ViewContainer>
    )
}

function _PreviewMode({asset}) {

    const [language, setLanguage] = React.useState("en")

    return (
        <>
            <TGui.Card>
                <TGui.Tabs
                    value={language}
                    onChange={(_, value) => setLanguage(value)}
                    centered
                >
                    <TGui.Tab label={"en"} value={"en"}/>
                    <TGui.Tab label={"cz"} value={"cz"}/>
                </TGui.Tabs>
            </TGui.Card>

            <TrainingTaskSetPreviewView asset={asset} forceLang={language}/>

        </>
    )
}

import React from "react";

import {ViewContainer} from "@components/ViewContainer";
import ExamAssetData from "@platform/assets/exam";

import {TGui} from "@external/tgui";

import Asset from "@platform/assets/Asset";

import QuestionEditCard from "@components/assets/exam-editor/QuestionEditCard";
import ExamQuestionsList from "@components/assets/exam-editor/ExamQuestionsList";
import {useLoadAssetFromParams} from "@components/assets/assets_hooks";
import {AssetFilesSideView} from "@components/assets/universal/AssetFilesView";
import ExamPlayerView from "@components/assets/exam-player/ExamPlayerView";
import {UniversalAssetEditCard} from "@components/assets/universal/UniversalAssetEditCard";

export default function ExamEditorView({}) {

    const asset = useLoadAssetFromParams()

    if (asset) {
        return (
            <ViewContainer style={{
                padding: "1em",
                marginTop: "3em",
            }}>
                <_ViewDispatcher asset={asset}/>
            </ViewContainer>
        )
    } else {
        return (
            <TGui.MiddleSpinner/>
        )
    }
}

function _ViewDispatcher({asset}) {

    const [t] = TGui.T()

    const [tab, setTab] = React.useState("0")

    return (
        <div className={"vstack gap-3"}>


            <TGui.Card>
                <TGui.Tabs
                    value={tab}
                    onChange={(_, value) => {
                        setTab(value)
                    }}
                    centered
                >
                    <TGui.Tab value={"0"} label={t("edit")}/>
                    <TGui.Tab value={"1"} label={t("preview")}/>

                </TGui.Tabs>
            </TGui.Card>

            <TGui.Switch condition={tab}>
                <TGui.Case value={"0"}>
                    <_ExamEditor asset={asset}/>
                </TGui.Case>

                <TGui.Case value={"1"}>
                    <ExamPlayerView asset={asset}/>

                </TGui.Case>


            </TGui.Switch>
        </div>
    )

}

function _ExamEditor({asset}: { asset: Asset }) {

    const [exam, setExam] = React.useState<[ExamAssetData]>([asset.data])

    function refresh() {
        setExam([asset.data])
    }

    crypto.randomUUID()

    return (
        <TGui.Stack gap={3}>

            <TGui.Row>
                <TGui.Col xs={3}>
                    <TGui.Stack gap={3}>
                        <UniversalAssetEditCard asset={asset}/>
                        <ExamQuestionsList exam={exam[0]} onRefresh={refresh}/>
                        <AssetFilesSideView asset={asset}/>
                    </TGui.Stack>


                </TGui.Col>
                <TGui.Col>

                    <div className={"vstack gap-3"}>

                        {
                            exam[0].questions.map((value, index) => {
                                return (
                                    <QuestionEditCard
                                        exam={exam[0]}
                                        index={index}
                                        question={value}
                                        key={value.uid}
                                        onRefresh={refresh}
                                    />
                                )
                            })
                        }

                    </div>
                </TGui.Col>

            </TGui.Row>

        </TGui.Stack>
    )
}

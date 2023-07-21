import React from "react";
import {useParams} from "react-router-dom";

import {MiddleSpinner} from "@components/Spinners";


import {ViewContainer} from "@components/ViewContainer";
import ExamAssetData, {ExamQuestion} from "@platform/assets/exam";
import AssetsApi from "@api/AssetsApi";
import {TGui} from "@external/tgui";
import HudButton from "@components/assets/HudButton";
import Asset from "@platform/assets/Asset";
import FsTools from "@api/FsTools";
import {useGlobalPopup} from "@platform/zustands/globalPopupZus";
import SelectQuizModal from "@components/assets/quiz-editor/SelectQuizTypeModal";
import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";
import QuestionEditCard from "@components/assets/quiz-editor/QuestionEditCard";
import ExamQuestionsList from "@components/assets/quiz-editor/ExamQuestionsList";

export default function ExamEditor({}) {

    const {projectuid, examuid} = useParams()

    const _projectUid: string = projectuid ?? ""

    const _examUid: string = examuid ?? ""


    const [asset, setAsset] = React.useState<Asset | null>(null)

    React.useEffect(() => {
        AssetsApi.GetAssetAndAssetData<ExamAssetData>(ExamAssetData, _projectUid, _examUid).then((value) => {
            setAsset(value)
        })

    }, [_projectUid, _examUid])

    if (asset) {
        return (
            <ViewContainer style={{padding: "0em", paddingTop: "3em"}}>
                <_ViewDispatcher asset={asset}/>
            </ViewContainer>
        )
    } else {
        return (
            <MiddleSpinner/>
        )
    }
}

function _ViewDispatcher({asset}) {

    const [t] = TGui.T()

    const [tab, setTab] = React.useState("0")

    return (
        <div className={"vstack gap-3"}>

            <_QuizAssetCard asset={asset}/>

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
                    Preview is not implemented
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

    return (
        <div className={"vstack gap-3"}>

            <TGui.Row>
                <TGui.Col xs={3}>
                    <ExamQuestionsList exam={exam[0]} onRefresh={refresh}/>
                </TGui.Col>
                <TGui.Col>

                    <div className={"vstack gap-3"}>

                        {
                            exam[0].questions.map((value) => {
                                return (
                                    <QuestionEditCard
                                        exam={exam[0]}
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

        </div>
    )
}

function _QuizAssetCard({asset}: { asset: Asset }) {
    const lock = useGlobalAppLock()

    const exam: ExamAssetData = asset.data

    async function savePressed() {
        lock.lock()
        await AssetsApi.UploadAssetData(asset.parent_project_uid, asset.uid, exam.ToJson())
        lock.unlock()
    }

    return (

        <TGui.Card style={{marginLeft: "auto", marginRight: "auto"}}>

            <TGui.CardMedia
                sx={{height: 140}}
                image={FsTools.ConvertFilePathRnd(asset.GetPreviewPath())}
            />


            <TGui.CardContent>
                <TGui.Typography>
                    {asset.name}
                </TGui.Typography>
            </TGui.CardContent>

            <TGui.CardActions>
                <TGui.Button
                    onClick={savePressed}
                    label={"save"}
                />
                <TGui.Button
                    label={"snapshot"}
                />
                <TGui.Button
                    label={"rename"}
                />

            </TGui.CardActions>
        </TGui.Card>
    )
}


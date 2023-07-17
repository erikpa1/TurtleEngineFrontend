import React from "react";
import {useParams} from "react-router-dom";

import {MiddleSpinner} from "@components/Spinners";

import TextAnswerEditor from "@components/assets/quiz-editor/TextAnswerEditor";

import ImageAnswerEditor from "@components/assets/quiz-editor/ImageAnswerEditor";

import SoundAnswerEditor from "@components/assets/quiz-editor/SoundAnswerEditor";

import SceneTaskAnswerEditor from "@components/assets/quiz-editor/SceneTaskAnswerEditor";

import {ViewContainer} from "@components/ViewContainer";
import ExamAssetData from "@platform/assets/exam";
import AssetsApi from "@api/AssetsApi";
import {TGui} from "@external/tgui";
import HudButton from "@components/assets/HudButton";
import Asset from "@platform/assets/Asset";
import FsTools from "@api/FsTools";
import {useGlobalPopup} from "@platform/zustands/globalPopupZus";
import SelectQuizModal from "@components/assets/quiz-editor/SelectQuizTypeModal";
import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";

export default function ExamEditor({}) {

    const {projectuid, examuid} = useParams()

    const _projectUid: string = projectuid ?? ""

    const _examUid: string = examuid ?? ""


    const [asset, setAsset] = React.useState<Asset | null>(null)

    React.useEffect(() => {

        console.log(_projectUid)
        console.log(_examUid)

        AssetsApi.GetAssetAndAssetData<ExamAssetData>(ExamAssetData, _projectUid, _examUid).then((value) => {
            setAsset(value)
        })

    }, [_projectUid, _examUid])

    if (asset) {
        return (
            <ViewContainer style={{padding: "25px", paddingTop: "55px"}}>
                <_ExamEditor exam={asset}/>
            </ViewContainer>
        )
    } else {
        return (
            <MiddleSpinner/>
        )
    }
}

function _ExamEditor({exam}) {

    return (
        <div className={"vstack gap-3"}>
            <_QuizAssetCard asset={exam}/>

            <TGui.Row>
                <TGui.Col xs={3}>
                    <_AnswersList asset={exam}/>
                </TGui.Col>
                <TGui.Col>
                    <div className={"vstack gap-3"}>
                        <TextAnswerEditor/>
                        <ImageAnswerEditor/>
                        <SoundAnswerEditor/>
                        <SceneTaskAnswerEditor/>
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

function _AnswersList({asset}: { asset: Asset }) {

    const exam: ExamAssetData = asset.data


    return (

        <div className={"vstack gap-3"}>

            <TGui.Card>
                <TGui.CardContent>
                    <div className={"vstack gap-3"}>
                        {
                            exam.questions.map((value) => {
                                return (
                                    <_QuestionLine key={value} question={value} index={value}/>
                                )
                            })
                        }

                    </div>
                </TGui.CardContent>

                <TGui.CardActions>
                    <_AddButton
                        asset={asset}
                        onRefresh={() => {
                        }}
                    />
                </TGui.CardActions>
            </TGui.Card>


        </div>


    )
}

function _QuestionLine({question, index}) {
    return (
        <div className={"hstack gap-1"}>
            <b>{index + 1}.</b>
            <TGui.Typography>
                {"Some name"}
            </TGui.Typography>

            <div className={"hstack gap-1"} style={{marginLeft: "auto"}}>
                <div>{"<"}</div>
                <div>{">"}</div>
                <div>{"x"}</div>

            </div>

        </div>
    )
}

function _AddButton({asset, onRefresh}) {


    const popupZus = useGlobalPopup()

    function addPressed() {
        popupZus.pushElement(
            <SelectQuizModal
                onClose={popupZus.popElement}
                onSelected={(type) => {
                    alert("Unimplemented")
                }}
            />
        )

    }

    return (
        <TGui.Button
            label={"add"}
            onClick={addPressed}
        />
    )

}

function _Print() {
    return (
        <TGui.Button
            label={"print"}
        />
    )
}
import React from "react";
import {useParams} from "react-router-dom";

import {MiddleSpinner} from "@components/Spinners";

import TextAnswerEditor from "@components/assets/quiz-editor/TextAnswerEditor";

import ImageAnswerEditor from "@components/assets/quiz-editor/ImageAnswerEditor";

import SoundAnswerEditor from "@components/assets/quiz-editor/SoundAnswerEditor";

import SceneTaskAnswerEditor from "@components/assets/quiz-editor/SceneTaskAnswerEditor";

import {ViewContainer} from "@components/ViewContainer";
import QuizData from "@platform/assets/quiz";
import AssetsApi from "@api/AssetsApi";
import {Row} from "react-bootstrap";
import {TGui} from "@external/tgui";
import HudButton from "@components/assets/HudButton";

export default function QuizEditor({}) {

    const {projectuid, quizuuid} = useParams()

    const _projectUid: string = projectuid ?? ""

    const _quizUid: string = quizuuid ?? ""

    const [quiz, setQuiz] = React.useState<QuizData | null>(null)

    React.useEffect(() => {

        AssetsApi.GetAssetData<QuizData>(QuizData, _projectUid, _quizUid).then((value) => {
            setQuiz(value)
        })

    }, [_projectUid, _quizUid])

    if (quiz) {
        return (
            <ViewContainer>
                <_QuizEditor quiz={quiz}/>
            </ViewContainer>
        )
    } else {
        return (
            <MiddleSpinner/>
        )
    }
}


function _QuizEditor({quiz}) {
    return (
        <div>
            <_QuizEditorTopBar/>
            <TGui.Row>
                <TGui.Col xs={3}>
                    <_AnswersList/>
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

function _QuizEditorTopBar({}) {
    return (
        <TGui.Stack direction={"horizontal"} gap={3}>
            <HudButton
                icon={"/icons/Save.svg"}
                lang={"save"}
            />

        </TGui.Stack>
    )
}

function _AnswersList({}) {
    return (
        <TGui.Stack gap={3}>
            {
                [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((value) => {
                    return (
                        <TGui.Card key={value}>
                            <TGui.CardContent>
                                There
                            </TGui.CardContent>
                        </TGui.Card>
                    )
                })
            }

        </TGui.Stack>
    )
}
import React from "react";
import {TGui} from "@external/tgui";
import {ExamQuestion} from "@platform/assets/exam";
import ExamAnswerCard from "@components/assets/exam-player/ExamAnswerCard";
import LanguagesApi from "@api/LanguagesApi";
import {useLoadAsset} from "@components/assets/assets_hooks";
import {useParams} from "react-router-dom";
import Asset from "@platform/assets/Asset";


interface QuestionPlayerCardProps {
    question: ExamQuestion
    index: number
    isEvaluated: boolean
}

export default function QuestionPlayerCard({question, isEvaluated, index}: QuestionPlayerCardProps) {


    const [answers, setAnswers] = React.useState(question.answers)

    function refresh() {
        setAnswers([...question.answers])
    }

    const colXs = question.content_uid === "" ? {xs: 1} : {xs: 5}


    return (
        <TGui.Card style={{backgroundColor: TGui.Colors.WhiteMiddle}}>

            <TGui.CardContent>
                <TGui.Stack gap={3}>

                    <TGui.Card>
                        <TGui.Stack
                            gap={3}
                            direction={"horizontal"}
                            style={{padding: "0.5em"}}
                        >
                            <TGui.TextBig>{index + 1}.</TGui.TextBig>
                            <TGui.TextBig>{LanguagesApi.T(question.header)}</TGui.TextBig>
                        </TGui.Stack>
                    </TGui.Card>

                    <TGui.Row>

                        <TGui.Col {...colXs}>

                            {
                                question.content_uid !== "" &&
                                <_QuestionContentCardLoader question={question}/>
                            }

                        </TGui.Col>

                        <TGui.Col>
                            <TGui.Stack gap={3}>

                                {
                                    answers.map((value, index) => {
                                        return (
                                            <ExamAnswerCard
                                                key={value.uid}
                                                index={index}
                                                answer={value}
                                                parentRefresh={refresh}
                                            />

                                        )
                                    })
                                }

                            </TGui.Stack>
                        </TGui.Col>
                    </TGui.Row>

                </TGui.Stack>
            </TGui.CardContent>

        </TGui.Card>
    )
}


function _QuestionContentCardLoader({question}: { question: ExamQuestion }) {

    const {projectuid}: any = useParams()

    const asset = useLoadAsset(projectuid, question.content_uid)


    if (asset) {
        return (
            <_QuestionContentCard asset={asset} question={question}/>
        )
    } else {
        return (
            <TGui.MiddleSpinner/>
        )
    }


}


interface _QuestionContentCardProps {
    question: ExamQuestion
    asset: Asset
}

function _QuestionContentCard({question, asset}: _QuestionContentCardProps) {
    return (
        <TGui.Card style={{
            height: "20em"
        }}>

        </TGui.Card>
    )
}
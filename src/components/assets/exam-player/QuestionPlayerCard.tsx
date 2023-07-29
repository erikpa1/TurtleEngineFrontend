import React from "react";
import {TGui} from "@external/tgui";
import {ExamQuestion} from "@platform/assets/exam";
import ExamAnswerCard from "@components/assets/exam-player/ExamAnswerCard";
import LanguagesApi from "@api/LanguagesApi";


interface QuestionPlayerCardProps {
    question: ExamQuestion
    index: number
}

export default function QuestionPlayerCard({question, index}: QuestionPlayerCardProps) {


    const [answers, setAnswers] = React.useState(question.answers)

    function refresh() {
        setAnswers([...question.answers])
    }


    const colXs = question.content_uid === "" ? {xs: 1} : {}

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
                            {index + 1}.
                            <div>{LanguagesApi.T(question.header)}</div>
                        </TGui.Stack>
                    </TGui.Card>

                    <TGui.Row>

                        <TGui.Col {...colXs}>

                        </TGui.Col>

                        <TGui.Col>
                            <TGui.Stack gap={3}>

                                {
                                    question.answers.map((value, index) => {
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
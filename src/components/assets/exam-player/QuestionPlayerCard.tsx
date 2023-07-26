import React from "react";
import {TGui} from "@external/tgui";
import {ExamQuestion} from "@platform/assets/exam";


interface QuestionPlayerCardProps {
    question: ExamQuestion
    index: number
}

export default function QuestionPlayerCard({question, index}: QuestionPlayerCardProps) {
    return (
        <TGui.Card style={{backgroundColor: TGui.Colors.WhiteMiddle}}>

            <TGui.CardContent>
                <TGui.Stack gap={3}>

                    <TGui.Card>
                        <TGui.Stack gap={3} direction={"horizontal"}
                                    style={{padding: "0.5em"}}
                        >
                            {index + 1}.

                        </TGui.Stack>
                    </TGui.Card>


                    {
                        question.answers.map((value, index) => {
                            return (

                                <div
                                    key={value.uid}
                                    className={"hstack gap-3"}
                                >

                                    <TGui.Card
                                        style={{
                                            padding: "0.35em"
                                        }}>
                                        {index + 1}.
                                    </TGui.Card>
                                </div>
                            )
                        })
                    }


                </TGui.Stack>
            </TGui.CardContent>

        </TGui.Card>
    )
}
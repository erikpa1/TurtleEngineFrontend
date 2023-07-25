import {ExamQuestion} from "@platform/assets/exam";
import {TGui} from "@external/tgui";
import React from "react";


interface _QuestionActions {
    question: ExamQuestion
    onFullRefresh: any
    index: number
}


export default function QuestionActions({
                                            index,
                                            question,
                                            onFullRefresh
                                        }: _QuestionActions) {


    function deleteQuestion() {
        question.RemoveFromParent()
        onFullRefresh()
    }

    function moveUp() {
        question.Rotate(index, -1)
        onFullRefresh()
    }

    function moveDown() {
        question.Rotate(index, 1)
        onFullRefresh()
    }

    return (

        <TGui.Stack
            direction={"horizontal"}
            gap={1}
            style={{
                marginLeft: "5em"
            }}
        >
            <TGui.IconClickButton
                size={"1.25em"}
                image={"/icons/Arrow.Down.svg"}
                onClick={moveDown}
            />
            <TGui.IconClickButton
                size={"1.25em"}
                image={"/icons/Arrow.Up.svg"}
                onClick={moveUp}
            />

            {
                question._parent.questions.length > 1 &&
                <TGui.IconClickButton
                    size={"1.25em"}
                    image={"/icons/Delete.svg"}
                    onClick={deleteQuestion}
                />
            }


        </TGui.Stack>

    )
}

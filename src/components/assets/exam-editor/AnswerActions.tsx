import {QuestionAnswer} from "@platform/assets/exam";
import {TGui} from "@external/tgui";
import React from "react";


interface _AnswerOptionsProps {
    answer: QuestionAnswer
    onRefresh: any
    index: number
    iconsSize?: string

}


export default function AnswerActions({
                                          answer,
                                          index,
                                          onRefresh,
                                          iconsSize
                                      }: _AnswerOptionsProps) {

    const _iconSize = iconsSize ?? "1.5em"

    function deletePressed() {
        answer.RemoveFromParent()
        onRefresh()
    }

    function moveUp() {
        answer._parent.RotateAnswers(index, -1)
        onRefresh()

    }

    function moveDown() {
        answer._parent.RotateAnswers(index, 1)
        onRefresh()
    }


    return (
        <TGui.Stack direction={"horizontal"} gap={1}>


            <TGui.IconClickButton
                size={_iconSize}
                image={"/icons/Arrow.Down.svg"}
                onClick={moveDown}
            />
            <TGui.IconClickButton
                size={_iconSize}
                image={"/icons/Arrow.Up.svg"}
                onClick={moveUp}
            />

            {
                answer._parent.answers.length > 2 &&
                <TGui.IconClickButton
                    size={_iconSize}
                    image={"/icons/Delete.svg"}
                    onClick={deletePressed}
                />
            }

        </TGui.Stack>
    )

}

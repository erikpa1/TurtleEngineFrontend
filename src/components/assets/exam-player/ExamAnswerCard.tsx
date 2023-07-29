import React from "react";
import {TGui} from "@external/tgui";

import {ExamQuestion, QuestionAnswer} from "@platform/assets/exam";
import {AssetsTypeMap} from "@platform/assets/Assets";
import LanguagesApi from "@api/LanguagesApi";


interface ExamAnswerCardProps {
    index: number,
    answer: QuestionAnswer
    parentRefresh: any
}

export default function ExamAnswerCard({index, answer, parentRefresh}: ExamAnswerCardProps) {

    const parentQuestion: ExamQuestion = answer._parent

    const [isSelected, setIsSelected] = React.useState(answer.isSelected)

    function clicked() {
        if (parentQuestion.isMultiChoice) {
            setIsSelected(!isSelected)
        } else {

            if (answer.isSelected === false) {
                for (const i of parentQuestion.answers) {
                    i.isSelected = false
                }
                answer.isSelected = true
                setIsSelected(true)

                parentRefresh()
            }

        }
    }

    React.useEffect(() => {
        setIsSelected(answer.isSelected)
    }, [answer.isSelected])

    return (
        <TGui.Card
            style={{
                padding: "0.55em",
                cursor: "pointer"
            }}
            onClick={clicked}
        >
            <TGui.Stack gap={3} direction={"horizontal"}>

                <_CheckElementSwitch
                    isMulti={parentQuestion.isMultiChoice}
                    isSelected={isSelected}
                />
                <div>{index + 1}.</div>
                <div>{LanguagesApi.T(answer.text)}</div>

            </TGui.Stack>

        </TGui.Card>
    )
}

function _CheckElementSwitch({isMulti, isSelected}) {

    let icon = ""

    if (isMulti) {
        icon = isSelected ? "/icons/Checkbox.Ok.svg" : "/icons/Checkbox.Empty.svg"
    } else {
        icon = isSelected ? "/icons/Radio.On.svg" : "/icons/Radio.Off.svg"
    }

    return (
        <TGui.IconClickButton
            image={icon}
            size={"1.5em"}
        />
    )
}
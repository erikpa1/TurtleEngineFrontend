import React from "react";
import {TGui} from "@external/tgui";

import {ExamQuestion, QuestionAnswer} from "@platform/assets/exam";
import LanguagesApi from "@api/LanguagesApi";


interface ExamAnswerCardProps {
    index: number,
    answer: QuestionAnswer
    parentRefresh: any
    isEvaluated: boolean
}

export default function ExamAnswerCard({
                                           index,
                                           answer,
                                           parentRefresh,
                                           isEvaluated
                                       }: ExamAnswerCardProps) {

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
                cursor: isEvaluated ? "" : "pointer"
            }}
            onClick={isEvaluated ? null : clicked}
        >
            <TGui.Stack gap={3} direction={"horizontal"}>

                <_CheckElementSwitch
                    isMulti={parentQuestion.isMultiChoice}
                    isSelected={isSelected}
                    isEvaluated={isEvaluated}
                />
                <div>{index + 1}.</div>
                <div>{LanguagesApi.T(answer.text)}</div>

                {
                    isEvaluated &&
                    <_AfterEvaluationPostFix answer={answer}/>
                }

            </TGui.Stack>

        </TGui.Card>
    )
}

function _AfterEvaluationPostFix({answer}: { answer: QuestionAnswer }) {

    let icon = ""

    if (answer.isSelected && answer.isRight) {
        icon = "/icons/Ok.svg"
    } else if (answer.isSelected && answer.isRight === false) {
        icon = "/icons/Cancel.svg"
    } else if (answer.isSelected === false && answer.isRight) {
        icon = "/icons/Create.Mesh.svg"
    }

    return (
        <>
            {
                icon !== "" &&
                <TGui.IconClickButton
                    image={icon}
                />
            }
        </>
    )
}


interface _CheckElementSwitchProps {
    isMulti: boolean
    isSelected: boolean
    isEvaluated: boolean
}

function _CheckElementSwitch({isMulti, isEvaluated, isSelected}: _CheckElementSwitchProps) {

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
            style={{
                opacity: isEvaluated ? 0.5 : 1
            }}
        />
    )
}
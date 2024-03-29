import React from "react";
import ExamAssetData, {ExamQuestion} from "@platform/assets/exam";
import {TGui} from "@external/tgui";
import {useGlobalPopup} from "@platform/zustands/globalPopupZus";
import SelectQuestionModal from "@components/assets/exam-editor/SelectQuestionTypeModal";
import AnswerActions from "@components/assets/exam-editor/AnswerActions";
import QuestionActions from "@components/assets/exam-editor/QuestionActions";


interface ExamQuestionsListProps {
    exam: ExamAssetData
    onRefresh: any
}

export default function ExamQuestionsList({exam, onRefresh}: ExamQuestionsListProps) {

    const [questions, setQuestions] = React.useState<Array<ExamQuestion>>([])

    function refresh() {
        setQuestions([...exam.questions])

    }

    React.useEffect(refresh, [])

    return (

        <div className={"vstack gap-3"}>

            <TGui.Card style={{backgroundColor: TGui.Colors.WhiteMiddle}}>
                <TGui.CardContent>
                    <div className={"vstack gap-2"}>
                        {
                            questions.map((value, index) => {
                                return (
                                    <_QuestionLine
                                        onFullRefresh={() => {
                                            refresh()
                                            onRefresh()
                                        }}
                                        key={value.uid}
                                        question={value}
                                        index={index}
                                    />
                                )
                            })
                        }

                    </div>
                </TGui.CardContent>

                <TGui.CardActions>
                    <_AddButton
                        exam={exam}
                        onRefresh={() => {
                            refresh()
                            onRefresh()
                        }}
                    />
                </TGui.CardActions>
            </TGui.Card>


        </div>


    )
}

interface _QuestionLineProps {
    question: ExamQuestion
    onFullRefresh: () => any
    index: number
}

function _QuestionLine({question, onFullRefresh, index}: _QuestionLineProps) {


    return (
        <TGui.Card>
            <div className={"hstack gap-1"} style={{margin: "0.25em"}}>
                <b>{index + 1}.</b>
                <TGui.Typography>
                    {question.header}
                </TGui.Typography>

                <div className={"hstack gap-1"} style={{marginLeft: "auto"}}>

                    <QuestionActions
                        index={index}
                        question={question}
                        onFullRefresh={onFullRefresh}
                    />


                </div>

            </div>
        </TGui.Card>

    )
}

function _AddButton({exam, onRefresh}) {

    const _exam: ExamAssetData = exam

    const popupZus = useGlobalPopup()

    function addPressed() {
        popupZus.pushElement(
            <SelectQuestionModal
                onClose={popupZus.popElement}
                onSelected={(type) => {
                    _exam.CreateQuestionOfType(type)
                    onRefresh()
                }}
            />
        )

    }

    return (
        <>
            <TGui.Button
                label={"add"}
                onClick={addPressed}
            />
            <_Print/>
        </>
    )

}


function _Print() {
    return (
        <TGui.Button
            label={"print"}
        />
    )
}



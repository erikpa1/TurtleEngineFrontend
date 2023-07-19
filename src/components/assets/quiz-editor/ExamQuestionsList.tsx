import React from "react";
import ExamAssetData, {ExamQuestion} from "@platform/assets/exam";
import {TGui} from "@external/tgui";
import {useGlobalPopup} from "@platform/zustands/globalPopupZus";
import SelectQuizModal from "@components/assets/quiz-editor/SelectQuizTypeModal";


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

            <TGui.Card style={{backgroundColor: "#f4f4f4"}}>
                <TGui.CardContent>
                    <div className={"vstack gap-2"}>
                        {
                            questions.map((value, index) => {
                                return (
                                    <_QuestionLine
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

function _QuestionLine({question, index}) {
    return (
        <TGui.PaperBox>
            <div className={"hstack gap-1"} style={{margin: "0.25em"}}>
                <b>{index + 1}.</b>
                <TGui.Typography>
                    {"Some name"}
                </TGui.Typography>

                <div className={"hstack gap-1"} style={{marginLeft: "auto"}}>

                    <TGui.IconClickButton
                        size={"1.5em"}
                        image={"/icons/Arrow.Down.svg"}
                    />
                    <TGui.IconClickButton
                        size={"1.5em"}
                        image={"/icons/Arrow.Up.svg"}
                    />

                    <div style={{width: "0.5em"}}/>

                    <TGui.IconClickButton
                        size={"1.5em"}
                        image={"/icons/Delete.svg"}
                    />


                </div>

            </div>
        </TGui.PaperBox>

    )
}

function _AddButton({exam, onRefresh}) {

    const _exam: ExamAssetData = exam

    const popupZus = useGlobalPopup()

    function addPressed() {
        popupZus.pushElement(
            <SelectQuizModal
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



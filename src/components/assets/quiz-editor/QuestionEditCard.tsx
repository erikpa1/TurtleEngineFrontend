import React from "react";
import ExamAssetData, {ExamQuestion, QuestionAnswer} from "@platform/assets/exam";
import {TGui} from "@external/tgui";

interface QuestionEditCardProps {
    exam: ExamAssetData
    question: ExamQuestion
    onRefresh: any
}

export default function QuestionEditCard({exam, question, onRefresh}: QuestionEditCardProps) {


    const [_question, setQuestion] = React.useState<[ExamQuestion]>([question])

    function refresh() {
        setQuestion([question])
    }

    return (
        <TGui.Card style={{backgroundColor: TGui.Colors.WhiteMiddle}}>

            <TGui.CardContent>


                <div className={"vstack gap-3"}>

                    <TGui.PaperBox>
                        <div className={"hstack gap-3"}>
                            <img
                                src={"/icons/Exam.svg"}
                                style={{
                                    width: "3em",
                                    height: "3em",
                                    margin: "0.1em"
                                }}/>

                            <_EditHeaderLabel question={question}/>

                        </div>
                    </TGui.PaperBox>

                    <div className={"hstack gap-3"}>

                        <div style={{width: "2em"}}/>

                        <div className={"vstack gap-3"}>

                            {
                                _question[0].answers.map((value, index) => {
                                    return (

                                        <div
                                            key={value.uid}
                                            className={"hstack gap-3"}
                                        >

                                            <TGui.PaperBox>
                                                <div
                                                    style={{
                                                        margin: "1em"
                                                    }}
                                                    className={"hstack gap-3"}
                                                >
                                                    <b>{index + 1}.</b>
                                                    <_EditAnswerTextLabel answer={value}/>

                                                    <div className={"hstack gap-3"} style={{
                                                        marginLeft: "auto"
                                                    }}>
                                                        <TGui.IconClickButton
                                                            size={"1.5em"}
                                                            image={"/icons/Delete.svg"}
                                                        />
                                                    </div>

                                                </div>

                                            </TGui.PaperBox>


                                        </div>

                                    )
                                })
                            }


                        </div>
                    </div>


                </div>

                <_QuestionLayoutBody question={_question[0]}/>

            </TGui.CardContent>


            <_CardActions question={_question[0]}
                          exam={exam}
                          onRefresh={refresh}
                          onFullRefresh={onRefresh}
            />


        </TGui.Card>
    )
}

interface _CardActionsProps {
    exam: ExamAssetData
    question: ExamQuestion
    onRefresh: any
    onFullRefresh: any
}

function _CardActions({
                          exam,
                          question,
                          onRefresh,
                          onFullRefresh
                      }: _CardActionsProps) {

    function deleteQuestion() {
        exam.questions = exam.questions.filter(val => val != question)
        onFullRefresh()
    }

    function moveUp() {
        alert("Unimplemented")
        onFullRefresh()
    }

    function moveDown() {
        alert("Unimplemented")
        onFullRefresh()
    }

    return (
        <TGui.CardActions>
            <div style={{marginLeft: "auto"}} className={"hstack gap-1"}>
                <TGui.IconClickButton
                    size={"2em"}
                    image={"/icons/Arrow.Down.svg"}
                />
                <TGui.IconClickButton
                    size={"2em"}
                    image={"/icons/Arrow.Up.svg"}
                />

                <div style={{width: "1em"}}/>

                <TGui.IconClickButton
                    size={"2em"}
                    image={"/icons/Delete.svg"}
                />

            </div>
        </TGui.CardActions>
    )
}


function _EditHeaderLabel({question}: { question: ExamQuestion }) {

    const [text, setText] = React.useState(question.header)

    function typing(e) {
        const _newVal = e.target.value
        question.header = _newVal
        setText(_newVal)

    }

    return (
        <div>
            <input
                type={"text"}
                value={text}
                onChange={typing}
            />

        </div>
    )
}

function _EditAnswerTextLabel({answer}: { answer: QuestionAnswer }) {

    const [text, setText] = React.useState(answer.text)

    function typing(e) {
        const _newVal = e.target.value
        answer.text = _newVal
        setText(_newVal)

    }

    return (
        <div>
            <input
                type={"text"}
                value={text}
                onChange={typing}
            />

        </div>
    )
}

function _QuestionLayoutBody({question}) {
    return (
        <>
        </>
    )
}

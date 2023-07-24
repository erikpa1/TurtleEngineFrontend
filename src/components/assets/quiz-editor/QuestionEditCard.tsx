import React from "react";
import ExamAssetData, {ExamQuestion, QuestionAnswer} from "@platform/assets/exam";
import {TGui} from "@external/tgui";
import LanguagesManager from "@app/LanguagesManager";
import FsTools from "@api/FsTools";

interface QuestionEditCardProps {
    index: number
    exam: ExamAssetData
    question: ExamQuestion
    onRefresh: any
}

export default function QuestionEditCard({exam, index, question, onRefresh}: QuestionEditCardProps) {


    const [_question, setQuestion] = React.useState<[ExamQuestion]>([question])

    function refresh() {
        setQuestion([question])
    }

    return (
        <TGui.Card style={{backgroundColor: TGui.Colors.WhiteMiddle}}>

            <TGui.CardContent>


                <div className={"vstack gap-3"}>

                    <TGui.Card>
                        <div
                            className={"hstack gap-3"}
                            style={{padding: "0.5em"}}
                        >
                            {index + 1}.
                            <_QuestionEditHeader
                                question={question}
                                onRefresh={onRefresh}
                            />

                        </div>
                    </TGui.Card>

                    <TGui.Row>

                        <TGui.Col xs={3}>
                            <TGui.Card>
                                <TGui.IconClickButton
                                    size={"10em"}
                                    image={FsTools.ConvertFilePath(FsTools.GetPlatformPath("Images/ProjectPreview.png"))}
                                    style={{
                                        padding: "5px"
                                    }}
                                />
                            </TGui.Card>

                        </TGui.Col>

                        <TGui.Col>
                            <TGui.Stack gap={3}>

                                {
                                    _question[0].answers.map((value, index) => {
                                        return (

                                            <div
                                                key={value.uid}
                                                className={"hstack gap-3"}
                                            >

                                                <TGui.Card
                                                    style={{
                                                        padding: "0.35em"
                                                    }}>
                                                    <_EditAnswerTextLabel answer={value} index={index}/>
                                                </TGui.Card>

                                            </div>

                                        )
                                    })
                                }

                            </TGui.Stack>
                        </TGui.Col>
                    </TGui.Row>

                </div>

                <_QuestionLayoutBody question={_question[0]}/>

            </TGui.CardContent>

        </TGui.Card>
    )
}

interface _EditHeaderLabelProps {
    question: ExamQuestion
    onRefresh: any
}

function _QuestionEditHeader({question, onRefresh}: _EditHeaderLabelProps) {

    const [type, setType] = React.useState("text-multi-answer")

    const [text, setText] = React.useState(question.header)

    function typing(e) {
        const _newVal = e.target.value
        question.header = _newVal
        setText(_newVal)

    }

    return (
        <TGui.Stack gap={3} direction={"horizontal"}>
            <input
                type={"text"}
                value={text}
                onChange={typing}
            />

            <TGui.TextMicro>
                {LanguagesManager.T(text)}
            </TGui.TextMicro>

            <TGui.IconClickButton
                image={"/icons/Checkbox.Ok.svg"}
            />

            <_CardActions
                question={question}
                onFullRefresh={onRefresh}
            />

        </TGui.Stack>
    )
}

interface _CardActionsProps {
    question: ExamQuestion
    onFullRefresh: any
}


function _CardActions({
                          question,
                          onFullRefresh
                      }: _CardActionsProps) {

    function deleteQuestion() {
        question.RemoveFromParent()
        onFullRefresh()
    }

    function moveUp() {
        question.RotateUp()
        onFullRefresh()
    }

    function moveDown() {
        question.RotateDown()
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
                size={"1.5em"}
                image={"/icons/Arrow.Down.svg"}
                onClick={moveDown}
            />
            <TGui.IconClickButton
                size={"1.5em"}
                image={"/icons/Arrow.Up.svg"}
                onClick={moveUp}
            />

            {
                question._parent.questions.length > 1 &&
                <TGui.IconClickButton
                    size={"1.5em"}
                    image={"/icons/Delete.svg"}
                    onClick={deleteQuestion}
                />
            }


        </TGui.Stack>

    )
}

interface _EditAnswerTextLabelProps {
    answer: QuestionAnswer
    index: number
}

function _EditAnswerTextLabel({answer, index}: _EditAnswerTextLabelProps) {

    const [text, setText] = React.useState(answer.text)

    function typing(e) {
        const _newVal = e.target.value
        answer.text = _newVal
        setText(_newVal)

    }

    return (
        <TGui.Stack
            direction={"horizontal"}
            gap={3}

        >
            <TGui.IconClickButton
                image={"/icons/Radio.Off.svg"}
                size={"1em"}
            />

            <b>{index + 1}.</b>


            <input
                type={"text"}
                value={text}
                onChange={typing}
            />

            <_AnswerActions
                answer={answer}
                onRefresh={() => {
                    //pass
                }}
            />

        </TGui.Stack>
    )
}


interface _AnswerOptionsProps {
    answer: QuestionAnswer
    onRefresh: any

}


function _AnswerActions({answer, onRefresh}: _AnswerOptionsProps) {

    function deletePressed() {
        answer.RemoveFromParent()
        onRefresh()
    }

    return (
        <TGui.Stack direction={"horizontal"} gap={1}>

            <div style={{width: "3em"}}/>

            <TGui.IconClickButton
                size={"1.5em"}
                image={"/icons/Arrow.Down.svg"}
            />
            <TGui.IconClickButton
                size={"1.5em"}
                image={"/icons/Arrow.Up.svg"}
            />

            {
                answer._parent.answers.length > 2 &&
                <TGui.IconClickButton
                    size={"1.5em"}
                    image={"/icons/Delete.svg"}
                    onClick={deletePressed}
                />
            }

        </TGui.Stack>
    )

}


function _QuestionLayoutBody({question}) {
    return (
        <>
        </>
    )
}

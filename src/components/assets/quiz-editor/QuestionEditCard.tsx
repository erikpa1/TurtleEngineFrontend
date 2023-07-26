import React from "react";
import ExamAssetData, {ExamQuestion, ExamQuestionContentTypes, QuestionAnswer} from "@platform/assets/exam";
import {TGui} from "@external/tgui";

import FsTools from "@api/FsTools";

import LanguagesApi from "@api/LanguagesApi";
import AnswerActions from "@components/assets/quiz-editor/AnswerActions";
import QuestionActions from "@components/assets/quiz-editor/QuestionActions";
import {AssetsTypeMap} from "@platform/assets/Assets";
import QuestionContentTypeView from "@components/assets/quiz-editor/QeustionContentTypeView";

interface QuestionEditCardProps {
    index: number
    exam: ExamAssetData
    question: ExamQuestion
    onRefresh: any
}

export default function QuestionEditCard({exam, index, question, onRefresh}: QuestionEditCardProps) {

    const [t] = TGui.T()

    const [_question, setQuestion] = React.useState<[ExamQuestion]>([question])

    const [answers, setAnswers] = React.useState(_question[0].answers)

    function refresh() {
        setAnswers([...question.answers])
        setQuestion([question])
    }

    function addAnswerPressed() {
        question.AddRandomAnswer()
        refresh()
    }

    return (
        <TGui.Card style={{backgroundColor: TGui.Colors.WhiteMiddle}}>

            <TGui.CardContent>

                <TGui.Stack gap={3}>

                    <TGui.Card>
                        <TGui.Stack gap={3} direction={"horizontal"}
                            style={{padding: "0.5em"}}
                        >
                            {index + 1}.
                            <_QuestionEditHeader
                                question={question}
                                onRefresh={onRefresh}
                                index={index}
                            />

                        </TGui.Stack>
                    </TGui.Card>

                    <TGui.Row>

                        <TGui.Col xs={4}>

                            <TGui.Stack gap={3}>

                                <TGui.Card style={{padding: "0.5em"}}>
                                    <TGui.Stack gap={3} direction={"horizontal"}>
                                        <TGui.TextMicro>
                                            {t("type")}:
                                        </TGui.TextMicro>
                                        <_EditQuestionContentButton
                                            question={question}
                                            onRefresh={onRefresh}
                                        />
                                    </TGui.Stack>
                                </TGui.Card>

                                <QuestionContentTypeView question={question} onRefresh={onRefresh}/>

                            </TGui.Stack>
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
                                                    <_EditAnswerLine
                                                        answer={value}
                                                        index={index}
                                                        onRefresh={refresh}
                                                    />
                                                </TGui.Card>
                                            </div>
                                        )
                                    })
                                }
                            </TGui.Stack>

                            <TGui.Button
                                style={{marginTop: "1em"}}
                                label={"add"}
                                onClick={addAnswerPressed}
                            />
                        </TGui.Col>
                    </TGui.Row>

                </TGui.Stack>

            </TGui.CardContent>

        </TGui.Card>
    )
}

interface _EditHeaderLabelProps {
    question: ExamQuestion
    onRefresh: any
    index: number
}

function _QuestionEditHeader({question, index, onRefresh}: _EditHeaderLabelProps) {

    const [text, setText] = React.useState(question.header)


    function typing(e) {
        const _newVal = e.target.value
        question.header = _newVal
        setText(_newVal)
    }

    function typeChanged() {
        question.isMultiChoice = !question.isMultiChoice
        onRefresh()
    }


    const icon = question.isMultiChoice ? "/icons/Checkbox.Ok.svg" : "/icons/Radio.On.svg"


    return (
        <TGui.Stack gap={3} direction={"horizontal"}>
            <input
                type={"text"}
                value={text}
                onChange={typing}
            />

            <TGui.TextMicro>
                {LanguagesApi.T(text)}
            </TGui.TextMicro>


            <TGui.IconClickButton
                image={icon}
                onClick={typeChanged}
            />

            <QuestionActions
                index={index}
                question={question}
                onFullRefresh={onRefresh}
            />

        </TGui.Stack>
    )
}


interface _EditAnswerTextLabelProps {
    answer: QuestionAnswer
    index: number
    onRefresh: any
}

function _EditAnswerLine({answer, index, onRefresh}: _EditAnswerTextLabelProps) {

    const [text, setText] = React.useState(answer.text)

    function typing(e) {
        const _newVal = e.target.value
        answer.text = _newVal
        setText(_newVal)
    }

    function validityPressed() {

        if (answer._parent.isMultiChoice) {
            answer.isRight = !answer.isRight
            onRefresh()
        } else {

            for (const i of answer._parent.answers) {
                i.isRight = false
            }

            answer.isRight = true
            onRefresh()
        }

    }

    const isMulti = answer._parent.isMultiChoice

    let icon = ""

    if (isMulti) {
        icon = answer.isRight ? "/icons/Checkbox.Ok.svg" : "/icons/Checkbox.Empty.svg"
    } else {
        icon = answer.isRight ? "/icons/Radio.On.svg" : "/icons/Radio.Off.svg"
    }

    return (
        <TGui.Stack
            direction={"horizontal"}
            gap={3}

        >
            <TGui.IconClickButton
                image={icon}
                size={"1.5em"}
                onClick={validityPressed}
            />

            <b>{index + 1}.</b>


            <input
                type={"text"}
                value={text}
                onChange={typing}
            />

            <div style={{width: "3em"}}/>

            <AnswerActions
                answer={answer}
                onRefresh={onRefresh}
                index={index}
            />

        </TGui.Stack>
    )
}


interface _EditQuestionContentButtonProps {
    question: ExamQuestion
    onRefresh: any
}

function _EditQuestionContentButton({question, onRefresh}: _EditQuestionContentButtonProps) {


    const ref = React.useRef<any>()

    const [t] = TGui.T()

    const [popoverVisible, setPopoverVisible] = React.useState(false)

    function contentTypeChanged(newType: string) {

        if (newType === "none") {
            question.content_type = ""
        } else {
            question.content_type = newType
        }


        question.content_uid = ""
        setPopoverVisible(false)

        onRefresh()
    }


    const contentTypeIcon = question.content_type === "" ? "/icons/Checkbox.Empty.svg" : `/icons/${AssetsTypeMap.get(question.content_type)?.ICON}`

    return (
        <div ref={ref}>
            <TGui.IconClickButton
                image={contentTypeIcon}
                onClick={() => setPopoverVisible(true)}
            />
            <TGui.Popover
                id={question.uid}
                open={popoverVisible}
                anchorEl={ref.current}
                onClose={() => setPopoverVisible(false)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)"
                }}

            >
                <div style={{
                    padding: "1em",
                    backgroundColor: TGui.Colors.WhiteMiddle
                }}>
                    <TGui.Stack gap={2}>

                        <_PopoverSelectionItem
                            icon={"/icons/Checkbox.Empty.svg"}
                            value={"none"}
                            contentTypeChanged={contentTypeChanged}

                        />

                        {
                            ExamQuestionContentTypes.ToArray().map((value) => {
                                return (
                                    <_PopoverSelectionItem
                                        icon={`/icons/${AssetsTypeMap.get(value)?.ICON}`}
                                        value={value}
                                        contentTypeChanged={contentTypeChanged}

                                    />
                                )
                            })
                        }

                    </TGui.Stack>
                </div>
            </TGui.Popover>
        </div>

    )
}

function _PopoverSelectionItem({icon, value, contentTypeChanged}) {

    const [t] = TGui.T()

    return (
        <TGui.Card
            key={value}
            style={{
                cursor: "pointer"
            }}
            onClick={() => {
                contentTypeChanged(value)
            }}
        >
            <TGui.Stack
                direction={"horizontal"}
                gap={3}
            >
                <TGui.IconClickButton
                    image={icon}
                    size={"2em"}
                    style={{
                        margin: "0.5em"
                    }}
                />
                <TGui.Typography>{t(value)}</TGui.Typography>
            </TGui.Stack>
        </TGui.Card>
    )
}
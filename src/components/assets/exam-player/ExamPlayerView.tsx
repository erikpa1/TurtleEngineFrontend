import React from "react";
import Asset from "@platform/assets/Asset";
import ExamAssetData, {ExamQuestion} from "@platform/assets/exam";
import QuestionPlayerCard from "@components/assets/exam-player/QuestionPlayerCard";
import {TGui} from "@external/tgui";
import {Translation} from "react-i18next";
import LanguagesApi from "@api/LanguagesApi";


interface ExamPlayerViewProps {
    asset: Asset
}

export default function ExamPlayerView({asset}: ExamPlayerViewProps) {

    const _exam: ExamAssetData = asset.data as any

    const [isEvaluated, setIsEvaluated] = React.useState(false)

    function evaluatePressed() {
        _exam.Evaluate()
        setIsEvaluated(!isEvaluated)
    }

    React.useEffect(() => {

        //pass

    }, [])

    return (
        <TGui.Row>
            <TGui.Col xs={3}>
                <_AnswersList exam={_exam} isEvaluated={isEvaluated}/>
            </TGui.Col>

            <TGui.Col>
                <TGui.Stack gap={3}>
                    {
                        _exam.questions.map((value, index) => {
                            return (
                                <QuestionPlayerCard
                                    key={value.uid}
                                    question={value}
                                    index={index}
                                    isEvaluated={isEvaluated}
                                />
                            )
                        })
                    }

                    {
                        isEvaluated === false &&
                        <TGui.Button
                            label={"evaluate"}
                            onClick={evaluatePressed}
                        />
                    }

                </TGui.Stack>
            </TGui.Col>
        </TGui.Row>
    )

}

interface _AnswersListProps {
    exam: ExamAssetData
    isEvaluated: boolean

}

function _AnswersList({exam, isEvaluated}: _AnswersListProps) {
    return (
        <TGui.Card style={{
            backgroundColor: TGui.Colors.WhiteMiddle,
            padding: "0.5em"
        }}>

            <TGui.Stack gap={2}>
                {
                    exam.questions.map((value, index) => {
                        return (
                            <TGui.Card style={{
                                padding: "0.25em"
                            }}>
                                <TGui.Stack gap={3} direction={"horizontal"}>
                                    <div>{index + 1}.</div>
                                    <div>{LanguagesApi.T(value.header)}</div>

                                    <div style={{marginLeft: "auto"}}>
                                        <TGui.IconClickButton
                                            image={"/icons/Checkbox.Empty.svg"}
                                        />

                                    </div>
                                </TGui.Stack>
                            </TGui.Card>
                        )
                    })
                }
            </TGui.Stack>

        </TGui.Card>
    )
}
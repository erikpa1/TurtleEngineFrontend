import React from "react";
import Asset from "@platform/assets/Asset";
import ExamAssetData from "@platform/assets/exam";
import QuestionPlayerCard from "@components/assets/exam-player/QuestionPlayerCard";
import {TGui} from "@external/tgui";


interface ExamPlayerViewProps {
    asset: Asset
}

export default function ExamPlayerView({asset}: ExamPlayerViewProps) {

    const _exam: ExamAssetData = asset.data as any

    const [isEvaluated, setIsEvaluated] = React.useState(false)

    function evaluatePressed() {
        setIsEvaluated(!isEvaluated)
    }

    React.useEffect(() => {

        //pass

    }, [])

    return (
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
    )

}
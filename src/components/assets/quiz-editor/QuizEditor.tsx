import React from "react";
import {useParams} from "react-router-dom";

import AssetsApi from "@api/AssetsApi";
import {MiddleSpinner} from "@components/Spinners";
import QuizAsset from "@platform/assets/QuizAsset";

import TextAnswerEditor from "@components/assets/quiz-editor/TextAnswerEditor";
import ImageAnswerEditor from "@components/assets/quiz-editor/ImageAnswerEditor";
import SoundAnswerEditor from "@components/assets/quiz-editor/SoundAnswerEditor";
import SceneTaskAnswerEditor from "@components/assets/quiz-editor/SceneTaskAnswerEditor";
import {ViewContainer} from "@components/ViewContainer";


export default function QuizEditor({}) {
    const {projectuid, quizuuid} = useParams()

    const _projectUid: string = projectuid ?? ""

    const _quizUid: string = quizuuid ?? ""

    const [quiz, setQuiz] = React.useState<QuizAsset | null>(null)

    React.useEffect(() => {

        AssetsApi.GetAsset(QuizAsset, _projectUid, _quizUid).then((value) => {
            setQuiz(value)
        })

    }, [_projectUid, _quizUid])

    if (quiz) {
        return (
            <ViewContainer>
                <_QuizEditor quiz={quiz}/>
            </ViewContainer>
        )
    } else {
        return (
            <MiddleSpinner/>
        )
    }
}


function _QuizEditor({quiz}) {
    return (
        <div className={"vstack gap-3"}>

            <TextAnswerEditor/>

            <ImageAnswerEditor/>

            <SoundAnswerEditor/>

            <SceneTaskAnswerEditor/>


        </div>
    )
}


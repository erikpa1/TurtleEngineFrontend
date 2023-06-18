import AssetParent, {AssetParentData} from "./AssetParent";

export default class QuizAsset extends AssetParent {
    static TYPE = "quiz"
    static FOLDER = "Quizzes"
    static LANG = "core.quiz"
    static LANG_PLURAL = "core.quizzes"
}

export class QuizAssetData extends AssetParentData {

    answers = new Map<string, any>()
    questions = new Map<string, any>()


    ToJson(): any {

        const _answers = Array.from(this.answers.values()).map(() => {
            return {}
        })

        const _questions = Array.from(this.questions.values()).map(() => {
            return {}
        })

        return {
            ...super.ToJson(),
            answers: _answers,
            questions: _questions
        }
    }
}
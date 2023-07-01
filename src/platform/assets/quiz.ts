export default class QuizData {

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
            answers: _answers,
            questions: _questions
        }
    }
}
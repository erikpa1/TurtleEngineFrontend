import {AssetData} from "@platform/assets/Asset";


export class ExamQuestionTypes {
    static MULTIPLE_CHOICE = "multiple_choice" // Vyber z viacerych moznosti
    static DECISION = "decision" //Rozhodovanie o obsahu veci
    static MATCHING = "matching" //Spajanie veci
    static DESCRIPTION = "description" //Essey a opis danej veci
    static COMPLETION = "completion" //Dopisovanie do policok
    static SORTING = "sorting" //Prehadzovanie medzi chlievikmi

    static ToArray(): Array<string> {
        return [
            ExamQuestionTypes.MULTIPLE_CHOICE,
            ExamQuestionTypes.DECISION,
            ExamQuestionTypes.MATCHING,
            ExamQuestionTypes.DESCRIPTION,
            ExamQuestionTypes.COMPLETION,
            ExamQuestionTypes.SORTING,
        ]
    }


}


export default class ExamAssetData extends AssetData {

    questions = new Array<ExamQuestion>()

    ToJson(): any {
        return {
            questions: this.questions.map(value => value.ToJson())
        }
    }


    FromJson(jobj: any) {
        const _questions = jobj.questions ?? []

        for (const i of _questions) {
            const tmp = new ExamQuestion()
            tmp.FromJson(tmp)
            this.questions.push(tmp)
        }


    }

    PushQuestionOfType(type: string) {

        const tmp = new ExamQuestion()
        tmp.type = type
        this.questions.push(tmp)
    }

}

export class ExamQuestionLayouts {
    static TWO_X_N = "2xn"
    static ONE_X_N = "1xn"
}

export class ExamQuestion {

    uid = crypto.randomUUID()
    header = ""
    type = ExamQuestionTypes.MULTIPLE_CHOICE
    type_data = {}
    layout = ExamQuestionLayouts.ONE_X_N

    answers = new Array<QuestionAnswer>()

    FromJson(jobj: any) {
        this.uid = jobj.uid ?? this.uid
        this.header = jobj.header ?? this.header
        this.type = jobj.type ?? this.type
        this.type_data = jobj.type_data ?? this.type_data
        this.layout = jobj.layout ?? this.layout
    }

    ToJson() {
        return {
            uid: this.uid,
            header: this.header,
            type: this.type,
            type_data: this.type_data,
            layout: this.layout,
            answers: this.answers.map(value => value.ToJson())
        }
    }

    ChangeType(newType: string) {
        //pass
    }

}

export class QuestionAnswer {

    ToJson() {
        return {}
    }

}

export class ConnectionQuestionAnswer {
    ToJson() {
        return {}
    }

}
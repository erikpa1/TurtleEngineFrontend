import {AssetData} from "@platform/assets/Asset";


export class ExamQuestionTypes {
    static SELECTION = "selection" // Vyber z viacerych moznosti
    static DECISION = "decision" //Rozhodovanie o obsahu veci
    static CONNECTION = "connection" //Spajanie veci
    static DESCRIPTION = "description" //Essey a opis danej veci
    static COMPLETION = "completion" //Dopisovanie do policok
    static SEQUENCE = "sequence" //Davanie do spravneho poradia
    static SORTING = "sorting" //Prehadzovanie medzi chlievikmi

    static ToArray(): Array<string> {
        return [
            ExamQuestionTypes.SELECTION,
            ExamQuestionTypes.DECISION,
            ExamQuestionTypes.CONNECTION,
            ExamQuestionTypes.DESCRIPTION,
            ExamQuestionTypes.COMPLETION,
            ExamQuestionTypes.SEQUENCE,
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

}

export class ExamQuestionLayouts {
    static TWO_X_N = "2xn"
    static ONE_X_N = "1xn"
}

export class ExamQuestion {

    header = ""
    type = ExamQuestionTypes.SELECTION
    type_data = {}
    layout = ExamQuestionLayouts.ONE_X_N

    answers = new Array<QuestionAnswer>()


    FromJson(jobj: any) {
        this.header = jobj.header ?? this.header
        this.type = jobj.type ?? this.type
        this.type_data = jobj.type_data ?? this.type_data
        this.layout = jobj.layout ?? this.layout
    }

    ToJson() {
        return {
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
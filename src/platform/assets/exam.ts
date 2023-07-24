import {AssetData} from "@platform/assets/Asset";


//TODO dorobit moznost pridat vec na opisanie pod otazku
export class ExamQuestionTypes {
    static MULTIPLE_CHOICE = "multiple_choice" // Vyber z viacerych moznosti
    static SINGLE_CHOICE = "single_choice" // Vyber z viacerych moznosti

    static MATCHING = "matching" //Spajanie veci
    static DESCRIPTION = "description" //Essey a opis danej veci
    static COMPLETION = "completion" //Dopisovanie do policok
    static SORTING = "sorting" //Prehadzovanie medzi chlievikmi

    static ToArray(): Array<string> {
        return [
            ExamQuestionTypes.MULTIPLE_CHOICE,
            ExamQuestionTypes.SINGLE_CHOICE,

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


    FromJson(context, jobj: any) {
        const _questions = jobj.questions ?? []

        for (const i of _questions) {
            const tmp = new ExamQuestion()
            tmp._parent = this
            tmp.FromJson(i)
            this.questions.push(tmp)
        }


    }

    CreateQuestionOfType(type: string) {

        const tmp = new ExamQuestion()
        tmp._parent = this
        tmp.header = "Is turtle best engine"
        tmp.type = type

        const tmpTrue = new QuestionAnswer()
        tmpTrue._parent = tmp
        tmpTrue.text = "true"

        const tmpFalse = new QuestionAnswer()
        tmpFalse._parent = tmp
        tmpFalse.text = "false"

        tmp.answers.push(tmpTrue)
        tmp.answers.push(tmpFalse)


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

    _parent: any = null

    FromJson(jobj: any) {

        this.uid = jobj.uid ?? this.uid
        this.header = jobj.header ?? this.header
        this.type = jobj.type ?? this.type
        this.type_data = jobj.type_data ?? this.type_data
        this.layout = jobj.layout ?? this.layout

        const _answers = jobj.answers ?? []

        for (const i of _answers) {
            const tmp = new QuestionAnswer()
            tmp._parent = this
            tmp.FromJson(i)
            this.answers.push(tmp)
        }

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

    RemoveFromParent() {
        this._parent.questions = this._parent.questions.filter(value => value !== this)
    }

    RotateUp() {
        alert("Rotate up is not implemented")
    }

    RotateDown() {
        alert("Rotate down is not implemented")
    }

}

export class QuestionAnswer {

    uid = crypto.randomUUID()
    text = ""
    _parent: any = null

    ToJson() {
        return {
            uid: this.uid,
            text: this.text
        }
    }

    FromJson(jobj: any) {
        this.uid = jobj.uid ?? this.uid
        this.text = jobj.text ?? this.text
    }

    RemoveFromParent() {
        this._parent.answers = this._parent.answers.filter(value => value !== this)
    }

    RotateUp() {
        alert("Rotate up is not implemented")
    }

    RotateDown() {
        alert("Rotate down is not implemented")
    }


}

export class ConnectionQuestionAnswer {
    ToJson() {
        return {}
    }

}


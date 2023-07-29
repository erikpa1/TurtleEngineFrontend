import {AssetData} from "@platform/assets/Asset";
import TurtleRandom from "@math/TurtleRandom";
import TurtleArrays from "@math/TurtleArrays";


const RANDOM_ANSWERS = [
    "$yes",
    "$no",
    "$true",
    "$false",
    "$maybe",
    "$thisone",
    "$never",
    "$once",
    "$twice",
]

//TODO dorobit moznost pridat vec na opisanie pod otazku
export class ExamQuestionContentTypes {
    static NONE = ""
    static IMAGE = "image"
    static SOUND = "sound"
    static VIDEO = "video"
    static MESH = "mesh"
    static PANORAMA = "panorama"
    static SCENE = "scene"

    static ToArray(): Array<string> {
        return [
            ExamQuestionContentTypes.IMAGE,
            ExamQuestionContentTypes.SOUND,
            ExamQuestionContentTypes.VIDEO,
            ExamQuestionContentTypes.MESH,
            ExamQuestionContentTypes.PANORAMA,
            ExamQuestionContentTypes.SCENE,

        ]
    }

}

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

        tmp.AddRandomAnswer(true)
        tmp.AddRandomAnswer(false)

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
    content_type = ""
    content_uid = ""
    type_data = {}

    isMultiChoice = false


    layout = ExamQuestionLayouts.ONE_X_N

    answers = new Array<QuestionAnswer>()

    _parent: any = null

    FromJson(jobj: any) {

        this.uid = jobj.uid ?? this.uid
        this.header = jobj.header ?? this.header
        this.type = jobj.type ?? this.type
        this.type_data = jobj.type_data ?? this.type_data
        this.layout = jobj.layout ?? this.layout
        this.isMultiChoice = jobj.isMultiChoice ?? this.isMultiChoice
        this.content_type = jobj.content_type ?? this.content_type
        this.content_uid = jobj.content_uid ?? this.content_uid

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
            content_type: this.content_type,
            content_uid: this.content_uid,
            isMultiChoice: this.isMultiChoice,
            answers: this.answers.map(value => value.ToJson())
        }
    }

    ChangeType(newType: string) {
        //pass
    }

    RemoveFromParent() {
        this._parent.questions = this._parent.questions.filter(value => value !== this)
    }

    Rotate(index, direction) {
        TurtleArrays.SwapElementsInDirection(this._parent.questions, index, direction)
    }

    RotateAnswers(index, direction) {
        TurtleArrays.SwapElementsInDirection(this.answers, index, direction)
    }

    AddRandomAnswer(isValid: boolean) {
        const tmp = new QuestionAnswer()
        tmp.text = RANDOM_ANSWERS[TurtleRandom.GetRandomFromZero(RANDOM_ANSWERS.length)]
        tmp._parent = this
        tmp.isRight = isValid

        this.answers.push(tmp)
    }

}

export class QuestionAnswer {

    uid = crypto.randomUUID()
    text = ""
    isRight = false

    _parent: any = null

    isSelected = false

    ToJson() {
        return {
            uid: this.uid,
            text: this.text,
            isRight: this.isRight
        }
    }

    ToJsonFull() {
        return {
            ...this.ToJson(),
            isSelected: this.isSelected
        }
    }

    FromJson(jobj: any) {
        this.uid = jobj.uid ?? this.uid
        this.text = jobj.text ?? this.text
        this.isRight = jobj.isRight ?? this.isRight
    }

    FromJsonFull(jobj: any) {
        this.FromJson(jobj)
        this.isSelected = jobj.isSelected ?? false
    }

    RemoveFromParent() {
        this._parent.answers = this._parent.answers.filter(value => value !== this)
    }


}

export class ConnectionQuestionAnswer {
    ToJson() {
        return {}
    }

}


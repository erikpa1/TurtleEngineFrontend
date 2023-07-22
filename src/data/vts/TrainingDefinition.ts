import TraningLevelDefinition from "@data/vts/TraningLevelDefinition";

export default class TraningDefinition {

    uid = crypto.randomUUID()

    key = ""
    lang = ""
    description = ""

    image_asset = ""
    video_asset = ""

    levels = new Array<TraningLevelDefinition>()

    ToJson(): any {
        return {
            uid: this.uid,
            levels: this.levels.map(value => value.ToJson())
        }
    }

    FromJson(context, jobject: any) {
        this.uid = jobject.uid ?? ""

        const _levels = jobject.levels ?? []

        for (const i of _levels) {
            const tmp = new TraningLevelDefinition()
            tmp.FromJson({}, i)
            this.levels.push(tmp)
        }

    }


}
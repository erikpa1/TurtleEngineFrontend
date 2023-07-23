import TraningDefinition from "@data/vts/TrainingDefinition";

import TraningLevelDefinition from "@data/vts/TraningLevelDefinition";


export default class TraningsApi {
    static async GetTrainings(): Promise<Array<TraningDefinition>> {

        const a = new TraningDefinition()
        a.lang = "FIRE extinguisher"
        a.key = "ehs.fire.extinguisher"
        a.description = "Usage of fire extinguisher"

        const b = new TraningDefinition()
        b.lang = "FIRE evacuvation"
        b.key = "ehs.fire.evacuvation"
        b.description = "Training for evacuvation"

        const c = new TraningDefinition()
        c.lang = "First AID"
        c.key = "ehs.first-aid"
        c.description = "Training for first aid"


        return [a, b, c]
    }

    static async GetTrainingLevelsOf(anyobj: any): Promise<Array<TraningLevelDefinition>> {

        const aa = new TraningLevelDefinition()
        aa.type = "scene"
        aa.lang = "Usage"
        aa.desciption = "This is some level"

        const ab = new TraningLevelDefinition()
        ab.type = "scene"
        ab.lang = "Usage - test"
        ab.desciption = "This is some level"

        const ac = new TraningLevelDefinition()
        ac.type = "quiz"
        ac.lang = "Usage - quiz"
        ac.desciption = "This is some level"

        const ad = new TraningLevelDefinition()
        ad.type = "scene"
        ad.lang = "Usage - video"
        ad.desciption = "This is some level"

        return [aa, ab, ac, ad]
    }


}
import TraningDefinition from "@data/vts/TrainingDefinition";

import TraningLevelDefinition from "@data/vts/TraningLevelDefinition";
import FsTools from "@api/FsTools";


export default class TraningsApi {
    static async GetTrainings(): Promise<Array<TraningDefinition>> {

        const a = new TraningDefinition()
        a.lang = "Zaisťovacie práce"
        a.key = "ehs.fire.extinguisher"
        a.description = "Usage of fire extinguisher"
        a.image = FsTools.GetProjectsPath("/vts/Texture_Level1.png")

        const b = new TraningDefinition()
        b.lang = "Ovládanie zariadení"
        b.key = "ehs.fire.evacuvation"
        b.description = "Training for evacuvation"
        b.image = FsTools.GetProjectsPath("/vts/Texture_Level2.png")


        return [a, b]
    }

    static async GetTrainingLevelsOf(anyobj: any): Promise<Array<TraningLevelDefinition>> {

        const aa = new TraningLevelDefinition()
        aa.type = "scene"
        aa.lang = "Zaistenie pracoviska"
        aa.desciption = "Celý level pre zaistenie pracoviska"
        aa.image = FsTools.GetProjectsPath("/vts/Texture_Level1.png")

        const ab = new TraningLevelDefinition()
        ab.type = "scene"
        ab.lang = "Odistenie pracoviska"
        ab.desciption = "Celý level pre odistenie pracoviska"
        ab.image = FsTools.GetProjectsPath("/vts/Texture_Level1.png")

        const ac = new TraningLevelDefinition()
        ac.type = "quiz"
        ac.lang = "Usage - quiz"
        ac.desciption = "This is some level"
        ac.image = FsTools.GetProjectsPath("/vts/Texture_Level1.png")

        const ad = new TraningLevelDefinition()
        ad.type = "scene"
        ad.lang = "Usage - video"
        ad.desciption = "This is some level"
        ad.image = FsTools.GetProjectsPath("/vts/Texture_Level1.png")

        return [aa, ab, ac, ad]
    }


}
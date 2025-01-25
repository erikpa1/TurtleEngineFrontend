import PlatformDispatcher from "@api/PlatformDispatcher"

import Axios from "@api/AxiosProvider"
import TurtleScene from "@data/project/Scene"


export default class ScenesApi {


    static async GetScene(uid: string): Promise<TurtleScene> {
        const data = (await Axios.get("/api/scene", {
            params: {
                uid: uid
            }
        }))

        const tmp = new TurtleScene()
        tmp.FromJson(data)
        return tmp

    }


    static async ListScenes(projectUid: string): Promise<Array<TurtleScene>> {
        if (PlatformDispatcher.IsDesktop()) {
            return []
            //return await TauriProjectPlugin.ListProjects()
        } else {
            const data = (await Axios.get("/api/scenes", {
                params: {
                    parent: projectUid,
                }
            })).data
            return TurtleScene.ArrayFromJsonArray(data)
        }
    }

    static async CreateScene(scene: TurtleScene): Promise<void> {

        if (PlatformDispatcher.IsDesktop()) {

        } else {
            const data = new FormData()
            data.set("data", JSON.stringify(scene.ToJson()))
            await Axios.post("/api/scene", data)
        }

    }


}
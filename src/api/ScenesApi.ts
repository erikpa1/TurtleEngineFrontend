import PlatformDispatcher from "@api/PlatformDispatcher"

import Axios from "@api/AxiosProvider"
import TurtleScene from "@data/project/Scene"


export default class ScenesApi {


    static async ListScenes(projectUid: string): Promise<Array<TurtleScene>> {
        if (PlatformDispatcher.IsDesktop()) {
            return []
            //return await TauriProjectPlugin.ListProjects()
        } else {
            const data = await Axios.get("/api/scenes", {
                params: {
                    parent: projectUid,
                }
            })
            console.log(data)
            return TurtleScene.ArrayFromJsonArray(data.data)
        }

    }


}
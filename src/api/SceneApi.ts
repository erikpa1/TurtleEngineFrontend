import axios from "axios";
import PlatformDispatcher from "@api/PlatformDispatcher";
import TauriStoragePlugin from "../tauri/plugin_storage";
import TurtleScene from "@data/scene";
import ProjectApi from "@api/project/ProjectApi";


export default class SceneApi {

    static async GetScene(scene_uid): Promise<any> {
        if (PlatformDispatcher.IsDesktop()) {
            return {}
        } else {
            return await axios.get("/api/scene", {params: {scene_uid: scene_uid}})
        }
    }

    static async GetScenes(project_uid: string): Promise<Array<TurtleScene>> {

        let data: Array<any> = []

        if (PlatformDispatcher.IsDesktop()) {
            data = await TauriStoragePlugin.QueryEntities("scenes", {})
        } else {
            data = (await axios.get("/api/scenes")).data
        }

        return data.map((val) => {
            const tmp = new TurtleScene()
            tmp.FromJson(val)
            return tmp
        })

    }

    static async CreateOrUpdateScene(scene: TurtleScene) {
        if (PlatformDispatcher.IsDesktop()) {
            await TauriStoragePlugin.InsertEntities("scenes", [scene.ToJson()])
            await ProjectApi.SaveProject()
        }
    }

    static async DeleteScene(scene_uid: string) {
        if (PlatformDispatcher.IsDesktop()) {
            //pass
        } else {
            await axios.get("/api/scenes")
        }

    }

}

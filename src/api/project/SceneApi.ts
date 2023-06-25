import PlatformDispatcher from "@api/PlatformDispatcher";
import SceneDefinition from "@platform/scene/SceneDefinition";
import SceneGraphicParams from "@platform/scene/SceneGraphicParams";
import TauriOsPlugin from "../../tauri/plugin_os";
import FsTools from "@api/FsTools";
import {Assets} from "@platform/assets/Assets";


export default class SceneApi {

    static async GetSceneDefinition(projectUid: string, sceneUid: string): Promise<SceneDefinition> {

        const sceneDefinition = new SceneDefinition()

        if (PlatformDispatcher.IsDesktop()) {
            const path = FsTools.GetPathInProject(projectUid, `${Assets.Scene.FOLDER}/${sceneUid}/SceneDefinition.json`)

            const exists = await TauriOsPlugin.FileExists(path);

            if (!exists) {
                await TauriOsPlugin.WriteFileString(path, "{}")
            }
            const fileData = await TauriOsPlugin.ReadFileString(path)
            sceneDefinition.FromJson(JSON.parse(fileData))

        } else {
            //pass
        }

        return sceneDefinition
    }

    static async SaveSceneDefinition(projectUid: string, sceneUid: string, sceneDefinition: SceneDefinition): Promise<boolean> {


        if (PlatformDispatcher.IsDesktop()) {
            const path = FsTools.GetPathInProject(projectUid, `${Assets.Scene.FOLDER}/${sceneUid}/SceneDefinition.json`)

            const sceneDefinitionString = JSON.stringify(sceneDefinition.ToJson())


            await TauriOsPlugin.WriteFileString(path, sceneDefinitionString)
        } else {
            //pass
        }
        return true
    }

    static async GetSceneGraphicParams(projectUid: string, sceneUid: string): Promise<SceneGraphicParams> {
        return new SceneGraphicParams()
    }


}
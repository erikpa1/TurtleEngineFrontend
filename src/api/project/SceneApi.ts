import PlatformDispatcher from "@api/PlatformDispatcher";

import SceneGraphicParams from "@platform/entities/SceneGraphicParams";
import TauriOsPlugin from "../../tauri/plugin_os";
import FsTools from "@api/FsTools";
import VirtualSceneDefinition from "@platform/assets/scenes/VirtualSceneDefinition";


export default class SceneApi {

    static async SaveSceneDefinition(projectUid: string, sceneUid: string, sceneDefinition: VirtualSceneDefinition): Promise<boolean> {


        if (PlatformDispatcher.IsDesktop()) {
            const path = FsTools.GetPathInProject(projectUid, `Assets/${sceneUid}/Default.json`)

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
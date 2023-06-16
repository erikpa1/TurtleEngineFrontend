import PlatformDispatcher from "@api/PlatformDispatcher";
import FsApi from "@api/FsApi";
import {resourceDir} from "@tauri-apps/api/path";

import TauriProjectPlugin from "../tauri/plugin_project";


export default class AppApi {


    static async Init() {
        if (PlatformDispatcher.IsDesktop()) {

            await TauriProjectPlugin.ActivateLastProject()

            const path = await resourceDir()
            FsApi.RESOURCES = path
            console.log(FsApi.RESOURCES)
        }


    }

}
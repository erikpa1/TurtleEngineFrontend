import ApiDispatcher from "@api/ApiDispatcher";
import FsApi from "@api/FsApi";
import {resourceDir} from "@tauri-apps/api/path";

import TauriProjectPlugin from "../tauri/plugin_project";


export default class AppApi {


    static async Init() {
        if (ApiDispatcher.IsDesktop()) {

            await TauriProjectPlugin.ActivateLastProject()

            const path = await resourceDir()
            FsApi.RESOURCES = path
            console.log(FsApi.RESOURCES)
        }


    }

}
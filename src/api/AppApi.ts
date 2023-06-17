import PlatformDispatcher from "@api/PlatformDispatcher";
import FsApi from "@api/FsApi";
import {resourceDir} from "@tauri-apps/api/path";

import TauriProjectPlugin from "../tauri/plugin_project";
import TauriOsPlugin from "../tauri/plugin_os";


export default class AppApi {


    static async Init() {
        if (PlatformDispatcher.IsDesktop()) {
            FsApi.WORK_DIR = await TauriOsPlugin.GetWorkingDirectory()
            await TauriProjectPlugin.ActivateLastProject()

        }


    }

}
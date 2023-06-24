import PlatformDispatcher from "@api/PlatformDispatcher";
import FsTools from "@api/FsTools";
import {resourceDir} from "@tauri-apps/api/path";

import TauriProjectPlugin from "../tauri/plugin_project";
import TauriOsPlugin from "../tauri/plugin_os";
import ConstantsApi from "@api/ConstantsApi";


export default class AppApi {


    static async Init() {


        if (PlatformDispatcher.IsDesktop()) {
            FsTools.WORK_DIR = await TauriOsPlugin.GetWorkingDirectory()

            await TauriProjectPlugin.ActivateLastProject()

        }

        await ConstantsApi.Init()


    }

}
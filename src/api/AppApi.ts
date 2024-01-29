import PlatformDispatcher from "@api/PlatformDispatcher";
import FsTools from "@api/FsTools";


import TauriOsPlugin from "../tauri/plugin_os";
import ConstantsApi from "@api/ConstantsApi";

export default class AppApi {


    static MODE = "editor"

    static IsPlayer() {
        return AppApi.MODE === "player"
    }

    static IsEditor() {
        return AppApi.MODE === "editor"
    }

    static async Init() {

        if (PlatformDispatcher.IsDesktop()) {
            FsTools.WORK_DIR = await TauriOsPlugin.GetWorkingDirectory()
        }
        await ConstantsApi.Init()
        await AppApi.RegisterFactory()

        if (AppApi.IsEditor()) {
            await AppApi.RegisterLibrary()
        }
    }

    static async RegisterFactory() {
        //Pass
    }

    static async RegisterLibrary() {
        //Pass
    }

}



import ApiDispatcher from "@api/ApiDispatcher";
import FsApi from "@api/FsApi";
import {resourceDir} from "@tauri-apps/api/path";


export default class AppApi {


    static async Init() {
        if (ApiDispatcher.IsDesktop()) {
            const path = await resourceDir()
            FsApi.RESOURCES = path
            console.log(FsApi.RESOURCES)
        }


    }

}
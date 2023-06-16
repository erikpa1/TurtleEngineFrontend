import PlatformDispatcher from "@api/PlatformDispatcher";
import {convertFileSrc} from "@tauri-apps/api/tauri";
import {sep} from "@tauri-apps/api/path";

export default class FsApi {


    static RESOURCES = "C:/Work/TurtleEngine/TurtleEngineFrontend/public/dev/assets/area/tmp-area/"

    static convertFilePath(path: string): string {
        if (PlatformDispatcher.IsDesktop()) {
            const tmp = convertFileSrc(path)//FsApi.normalizePath(FsApi.RESOURCES + path)
            return tmp
        } else {
            return path
        }
    }

    static normalizePath(path: string): string {
        return path.replaceAll("/", sep)
    }

}
import PlatformDispatcher from "@api/PlatformDispatcher";
import {convertFileSrc} from "@tauri-apps/api/tauri";
import {sep} from "@tauri-apps/api/path";
import {path} from "@tauri-apps/api";

export default class FsApi {

    static WORK_DIR = ""

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

    static GetPlatformPath(path: string) {
        return FsApi.normalizePath(`${FsApi.WORK_DIR}platform/${path}`)
    }

    static GetFileExtension(name: string): string {
        return name.split(".").pop() as string
    }


    static ReplaceFileExtention(filePath: string, newExtension: string): string {
        const paths = filePath.split(".")

        paths[paths.length - 1] = newExtension

        const finalPath = paths.join(".")

        console.log(`Previous  file: ${filePath}`)
        console.log(`New  file: ${finalPath}`)


        return finalPath
    }


}
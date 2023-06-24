import PlatformDispatcher from "@api/PlatformDispatcher";
import {convertFileSrc} from "@tauri-apps/api/tauri";
import {sep} from "@tauri-apps/api/path";

export default class FsTools {

    static WORK_DIR = "/"
    static ConvertFilePath(path: string): string {
        if (PlatformDispatcher.IsDesktop()) {
            const tmp = convertFileSrc(path)//FsApi.normalizePath(FsApi.RESOURCES + path)
            return tmp
        } else {
            return path
        }
    }

    static NormalizePath(path: string): string {
        return path.replaceAll("/", sep)
    }

    static GetPlatformPath(path: string) {
        return FsTools.NormalizePath(`${FsTools.WORK_DIR}platform/${path}`)
    }

    static GetProjectsPath(path: string) {
        return FsTools.NormalizePath(`${FsTools.WORK_DIR}projects/${path}`)
    }

    static GetPathInProject(projectUid: string, path: string) {
        return FsTools.GetProjectsPath(`${projectUid}/${path}`)
    }


    static GetFileExtension(name: string): string {
        return name.split(".").pop() as string
    }


    static ReplaceFileExtention(filePath: string, newExtension: string): string {
        const paths = filePath.split(".")

        paths[paths.length - 1] = newExtension

        const finalPath = paths.join(".")

        return finalPath
    }

    static ReplaceFileNameAndExtension(filePath: string, newFileName: string): string {
        const paths = filePath.split(sep)
        paths[paths.length - 1] = newFileName
        const finalPath = paths.join(sep)
        return finalPath
    }


}
import {invoke} from "@tauri-apps/api/tauri";
import FsTools from "@api/FsTools";


export const IMAGES_PLUGIN_NAME = "plugin:turtle_images|"
export default class ImagesApi {

    static async GeneratePreviewDesktop(imageFrom: string, imageTo: string, width: number) {
        await invoke<boolean>(`${IMAGES_PLUGIN_NAME}CreatePreview`, {
            sourcePath: FsTools.NormalizePath(imageFrom),
            targetPath: FsTools.NormalizePath(imageTo),
            width: width,

        })

        return true
    }

}
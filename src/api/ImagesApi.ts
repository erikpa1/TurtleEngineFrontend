import {invoke} from "@tauri-apps/api/tauri";


export const IMAGES_PLUGIN_NAME = "plugin:turtle_images|"
export default class ImagesApi {

    static async GeneratePreviewDesktop(imageFrom: string, imageTo: string, width: number) {
        await invoke<boolean>(`${IMAGES_PLUGIN_NAME}CreatePreview`, {
            sourcePath: imageFrom,
            targetPath: imageTo,
            width: width,

        })

        return true
    }

}
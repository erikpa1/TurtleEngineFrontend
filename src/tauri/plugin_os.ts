import {invoke} from "@tauri-apps/api/tauri";

export const ASSETS_PLUGIN_NAME = "plugin:turtle_os|"


export default class TauriOsPlugin {
    static async OpenFolder(folder: string): Promise<boolean> {
        await invoke<string>(`${ASSETS_PLUGIN_NAME}OpenFolder`, {
            folder: folder,
        })
        return true
    }

    static async DeleteFolder(folder: string): Promise<boolean> {
        await invoke<string>(`${ASSETS_PLUGIN_NAME}DeleteFolder`, {
            folder: folder,
        })
        return true
    }

    static async WriteFileString(file: string, content: string): Promise<boolean> {
        await invoke<string>(`${ASSETS_PLUGIN_NAME}WriteFileString`, {
            file: file,
            content: content,
        })
        return true
    }

    static async CopyFile(fromPath: string, toPath: string): Promise<boolean> {
        await invoke<string>(`${ASSETS_PLUGIN_NAME}CopyFile`, {
            fromPath: fromPath,
            toPath: toPath,
        })
        return true
    }

    static async ReadFileString(file: string): Promise<string> {
        const response = await invoke<string>(`${ASSETS_PLUGIN_NAME}ReadFileString`, {
            file: file,
        })
        return response
    }

    static async FileExists(file: string): Promise<boolean> {
        const response = await invoke<string>(`${ASSETS_PLUGIN_NAME}FileExists`, {
            file: file,
        })
        return response === "true" ? true : false
    }


    static async GetWorkingDirectory(): Promise<string> {
        const data = await invoke<string>(`${ASSETS_PLUGIN_NAME}GetWorkingDirectory`)
        return data
    }


}
import {invoke} from "@tauri-apps/api/tauri";

export const ASSETS_PLUGIN_NAME = "plugin:turtle_os|"


export default class TauriOsPlugin {
    static async OpenFolder(folder: string): Promise<boolean> {
        await invoke<string>(`${ASSETS_PLUGIN_NAME}OpenFolder`, {
            folder: folder,
        })
        return true

    }

}
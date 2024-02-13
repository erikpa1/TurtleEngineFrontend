import {invoke} from "@tauri-apps/api/tauri";

export const PROJECTS_PLUGIN_NAME = "plugin:turtle_projects|"

export default class TauriStoragePlugin {
    static async QueryEntities(container: string, query: any): Promise<boolean> {
        await invoke<string>(`${PROJECTS_PLUGIN_NAME}QueryEntities`, {
            container: container,
            query: JSON.stringify(query),
        })
        return true
    }

    static async InsertEntities(container: string, data: Array<any>): Promise<boolean> {
        await invoke<string>(`${PROJECTS_PLUGIN_NAME}InsertEntities`, {
            container: container,
            data: JSON.stringify(data),
        })
        return true
    }

    static async DeleteEntity(container: string, query: any): Promise<boolean> {
        await invoke<string>(`${PROJECTS_PLUGIN_NAME}DeleteEntity`, {
            container: container,
            query: JSON.stringify(query),
        })
        return true
    }

}
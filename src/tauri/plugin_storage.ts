import {invoke} from "@tauri-apps/api/tauri";

export const PROJECTS_PLUGIN_NAME = "plugin:turtle_projects|"

export default class TauriStoragePlugin {


    static async QueryEntity(container: string, query: any): Promise<null | object> {
        const data = await TauriStoragePlugin.QueryEntities(container, query)

        if (data.length > 0) {
            return data[0]
        } else {
            return null
        }

    }

    static async QueryEntities(container: string, query: any): Promise<Array<any>> {
        const data_str = await invoke<string>(`${PROJECTS_PLUGIN_NAME}QueryEntities`, {
            container: container,
            query: JSON.stringify(query),
        })
        return JSON.parse(data_str)
    }

    static async InsertEntities(container: string, data: Array<any>): Promise<boolean> {
        await invoke<string>(`${PROJECTS_PLUGIN_NAME}InsertEntities`, {
            container: container,
            data: JSON.stringify(data),
        })
        return true
    }

    static async DeleteEntities(container: string, query: any): Promise<boolean> {
        await invoke<string>(`${PROJECTS_PLUGIN_NAME}DeleteEntities`, {
            container: container,
            query: JSON.stringify(query),
        })
        return true
    }

}
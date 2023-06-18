import {invoke} from "@tauri-apps/api/tauri";
import {CreateProjectParams} from "@api/project/params";

export const PROJECTS_PLUGIN_NAME = "plugin:turtle_sqlite|"

export default class TauriSqlitePlugin {
    static async Exec(query: string): Promise<boolean> {
        await invoke<string>(`${PROJECTS_PLUGIN_NAME}Exec`, {
            query: query,
        })
        return true
    }
}
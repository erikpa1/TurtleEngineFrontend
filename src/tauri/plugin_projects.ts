import {invoke} from "@tauri-apps/api/tauri";
import {CreateProjectParams} from "@api/project/params";

export const PROJECTS_PLUGIN_NAME = "plugin:turtle_projects|"


export default class TauriProjectsPlugin {
    static async CreateProject(params: CreateProjectParams): Promise<boolean> {
        await invoke<string>(`${PROJECTS_PLUGIN_NAME}CreateProject`, {
            projectJson: JSON.stringify(params),
        })
        return true
    }

    static async GetLastProjects(): Promise<string> {
        return await invoke<string>(`${PROJECTS_PLUGIN_NAME}ListProjects`)
    }

}
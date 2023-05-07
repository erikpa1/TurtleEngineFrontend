import {invoke} from "@tauri-apps/api/tauri";
import {CreateProjectParams} from "../api/project/data";
import {ProjectLight} from "@data/project/ProjectLight";

export const PROJECTS_PLUGIN_NAME = "plugin:turtle_projects|"


export default class TauriProjectPlugin {

    static async CreateProject(params: CreateProjectParams): Promise<string> {
        return await invoke<string>(`${PROJECTS_PLUGIN_NAME}CreateProject`, {
            projectJson: JSON.stringify(params),
        })
    }

    static async ListProjects(): Promise<Array<ProjectLight>> {
        const response = await invoke<string>(`${PROJECTS_PLUGIN_NAME}ListProjects`)
        const parsed = JSON.parse(response)
        return parsed.projects
    }
}


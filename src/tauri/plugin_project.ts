import {invoke} from "@tauri-apps/api/tauri";
import {CreateProjectParams} from "@api/project/params";
import {ProjectLight} from "@data/project/ProjectLight";

export const PROJECTS_PLUGIN_NAME = "plugin:turtle_projects|"


export default class TauriProjectPlugin {

    static async CreateProject(params: CreateProjectParams): Promise<boolean> {
        await invoke<string>(`${PROJECTS_PLUGIN_NAME}CreateProject`, {
            projectJson: JSON.stringify(params),
        })

        return true
    }

    static async DeleteProject(uid: string): Promise<boolean> {
        await invoke<string>(`${PROJECTS_PLUGIN_NAME}DeleteProject`, {
            uid: uid,
        })

        return true
    }

    static async ListProjects(): Promise<Array<ProjectLight>> {
        const response = await invoke<string>(`${PROJECTS_PLUGIN_NAME}ListProjects`)
        const parsed = JSON.parse(response)
        return parsed.projects
    }

    static async GetProjectLight(projectUid: string): Promise<ProjectLight> {
        const response = await invoke<string>(`${PROJECTS_PLUGIN_NAME}GetProjectLight`, {
            projectUid: projectUid,
        })
        return JSON.parse(response)
    }

    static async UploadProjectLightData(params: CreateProjectParams): Promise<boolean> {
        await invoke<string>(`${PROJECTS_PLUGIN_NAME}UploadProjectLightData`, {
            projectJson: JSON.stringify(params),
        })
        return true
    }

    static async GetAndActivateProject(projectUid: string): Promise<boolean> {
        await invoke<boolean>(`${PROJECTS_PLUGIN_NAME}GetAndActivateProject`, {
            projectUid: projectUid,
        })

        return true

    }
}


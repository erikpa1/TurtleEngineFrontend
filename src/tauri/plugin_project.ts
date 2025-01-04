import {invoke} from "@tauri-apps/api/tauri";
import {Project} from "@data/project/Project";
import TauriOsPlugin from "./plugin_os";
import FsTools from "@api/FsTools";

export const PROJECTS_PLUGIN_NAME = "plugin:turtle_projects|"


export default class TauriProjectPlugin {

    static async CreateProject(project: Project): Promise<string> {
        const uid = await invoke<string>(`${PROJECTS_PLUGIN_NAME}CreateProject`, {
            projectJson: JSON.stringify(project.ToJson()),
        })
        return uid
    }

    static async ActivateLastProject(): Promise<Project> {
        const response = await invoke<string>(`${PROJECTS_PLUGIN_NAME}ActivateLastProject`).catch((expection => {
            console.log(expection)
        }))

        return null as any
    }

    static async ActivateProject(projectUid: string): Promise<Project> {
        const response = await invoke<string>(`${PROJECTS_PLUGIN_NAME}GetAndActivateProject`, {
            projectUid: projectUid,
        })

        return JSON.parse(response)
    }

    static async DeleteProject(uid: string): Promise<boolean> {
        await invoke<string>(`${PROJECTS_PLUGIN_NAME}DeleteProject`, {
            uid: uid,
        })

        return true
    }

    static async ListProjects(): Promise<Array<Project>> {
        const response = await invoke<string>(`${PROJECTS_PLUGIN_NAME}ListProjects`)
        const parsed = JSON.parse(response)

        return Project.ArrayFromJsonArray(parsed.projects)


    }

    static async GetProjectLight(projectUid: string): Promise<Project> {
        const response = await invoke<string>(`${PROJECTS_PLUGIN_NAME}GetProjectLight`, {
            projectUid: projectUid,
        })

        const tmp = new Project()
        tmp.FromJson(JSON.parse(response))

        return tmp
    }

    static async UploadProjectLightData(params: Project): Promise<boolean> {
        await TauriOsPlugin.WriteFileString(FsTools.GetProjectsPath(`${params.uid}/project_light.json`), JSON.stringify(params.ToJson()));
        return true
    }

    static async GetAndActivateProject(projectUid: string): Promise<boolean> {
        await invoke<boolean>(`${PROJECTS_PLUGIN_NAME}GetAndActivateProject`, {
            projectUid: projectUid,
        })
        return true
    }

    static async ChangeProjectCover(projectUid: string, filePath: string): Promise<boolean> {
        await invoke<boolean>(`${PROJECTS_PLUGIN_NAME}ChangeProjectCover`, {
            projectUid: projectUid,
            sourcePath: filePath,
        })

        return true

    }
}


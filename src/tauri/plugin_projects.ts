import {invoke} from "@tauri-apps/api/tauri";
import {CreateProjectParams} from "@api/project/params";
import {message} from "@tauri-apps/api/dialog";
import i18n from "../i18n";


export const PROJECTS_PLUGIN_NAME = "plugin:turtle_projects|"


export default class TauriProjectsPlugin {
    static async CreateProject(params: CreateProjectParams): Promise<boolean> {
        const data = await invoke<string>(`${PROJECTS_PLUGIN_NAME}CreateProject`, {
            projectJson: JSON.stringify(params),
        })

        if (data === "") {
            message(i18n.t("error.foldernonempty"), {
                title: "Error",
                type: "error"
            })
            return false
        }

        return true
    }

    static async GetLastProjects(): Promise<string> {
        return await invoke<string>(`${PROJECTS_PLUGIN_NAME}ListProjects`)
    }

}
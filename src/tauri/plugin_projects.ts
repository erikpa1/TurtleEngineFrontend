import {invoke} from "@tauri-apps/api/tauri";
import {CreateProjectParams} from "@api/project/params";
import {message} from "@tauri-apps/api/dialog";
import i18n from "../i18n";
import TurtleFile from "@api/project/files";


export const PROJECTS_PLUGIN_NAME = "plugin:turtle_projects|"


export default class TauriProjectsPlugin {
    static async ActivateProject(path: string): Promise<any> {
        const data = JSON.parse(await invoke<string>(`${PROJECTS_PLUGIN_NAME}ActivateProject`, {
            filePath: path,
        }))

        if (!data.ok) {
            message(`${i18n.t("error.failedtoloadproject")}: \n\n ${data.reason}`, {
                title: "Error",
                type: "error"
            })
        }

        return data
    }

    static async DeleteCached(path: string): Promise<boolean> {

        await invoke<boolean>(`${PROJECTS_PLUGIN_NAME}DeleteCached`, {
            filePath: path,
        })

        return true
    }

    static async CreateProject(params: CreateProjectParams): Promise<boolean> {
        const data = await invoke<string>(`${PROJECTS_PLUGIN_NAME}CreateProject`, {
            projectJson: JSON.stringify(params),
        })

        if (data === "") {
            message(`${i18n.t("error.foldernonempty")}: \n ${params.folder}`, {
                title: "Error",
                type: "error"
            })
            return false
        }
        return true
    }

    static async GetProjectFiles(): Promise<Array<TurtleFile>> {
        const result: Array<TurtleFile> = []
        // const result: Array<TurtleFile> = JSON.parse(await invoke<string>(`${PROJECTS_PLUGIN_NAME}GetProjectFiles`)).map((val) => {
        //     const file = new TurtleFile()
        //     file.FromJson(val)
        //     return file
        // })

        for (let i = 0; i < 100; i++) {
            const file = new TurtleFile()
            file.name = `File_${i}.json`
            file.path = `File_${i}.json`
            file.preview = `Preview_${i}.png`
            result.push(file)
        }

        return result

    }

    static async GetLastProjects(): Promise<string> {
        return await invoke<string>(`${PROJECTS_PLUGIN_NAME}ListProjects`)
    }

}
import axios from "axios";
import PlatformDispatcher from "../PlatformDispatcher";
import {CreateProjectParams, LastProjectInfo} from "@api/project/params";
import TauriProjectsPlugin from "../../tauri/plugin_projects";


export default class ProjectApi {

    static async CreateProject(params: CreateProjectParams): Promise<string> {
        if (PlatformDispatcher.IsDesktop()) {
            await TauriProjectsPlugin.CreateProject(params)
            return ""
        } else {
            await axios.post("/api/project", null, {
                params: params
            }).catch((e) => {
                console.log(e.request.responseText)
            })
            return ""
        }
    }

    static async GetLastProjects(): Promise<Array<LastProjectInfo>> {
        if (PlatformDispatcher.IsDesktop()) {
            const data = JSON.parse(await TauriProjectsPlugin.GetLastProjects())

            return data.map((val) => {
                const tmp = new LastProjectInfo()
                tmp.FromJson(val)
                return tmp
            })
        } else {
            await axios.get("/api/projects").catch((e) => {
                console.log(e.request.responseText)
            })

            return []
        }
    }


}
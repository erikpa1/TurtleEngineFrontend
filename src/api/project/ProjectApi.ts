import PlatformDispatcher from "../PlatformDispatcher"

import {Project} from "@data/project/Project"
import TauriProjectPlugin from "../../tauri/plugin_project"

import Axios from "@api/AxiosProvider"


export default class ProjectApi {

    static async ActivateProject(projectUid: string): Promise<Project | null> {
        if (PlatformDispatcher.IsDesktop()) {
            const result = await TauriProjectPlugin.ActivateProject(projectUid)
            await new Promise(resolve => setTimeout(resolve, 1000));

            return result
        } else {
            //
        }
        return null
    }

    static async CreateProject(project: Project): Promise<string> {
        if (PlatformDispatcher.IsDesktop()) {
            return await TauriProjectPlugin.CreateProject(project)
        } else {

            const formData = new FormData()
            formData.set("data", JSON.stringify(project.ToJson()))

            const uid = (await Axios.post("/api/project", formData)).data

            return uid
        }
        return ""
    }


    static async DeleteProject(projectUid: string): Promise<boolean> {
        if (PlatformDispatcher.IsDesktop()) {
            return await TauriProjectPlugin.DeleteProject(projectUid)
        } else {
            alert("Create project is unimplemented for WEB")
        }
        return false
    }


    static async GetAndActivateProject(projectUid: string): Promise<boolean> {
        if (PlatformDispatcher.IsDesktop()) {
            return await TauriProjectPlugin.GetAndActivateProject(projectUid)
        } else {
            alert("Create project is unimplemented for WEB")
        }
        return false
    }

    static async ListProjects(): Promise<Array<Project>> {
        if (PlatformDispatcher.IsDesktop()) {
            return await TauriProjectPlugin.ListProjects()
        } else {
            const data = await Axios.get("/api/projects")
            console.log(data)
            return Project.ArrayFromJsonArray(data.data)
        }

    }

    static async GetProjectLight(projectUid: string): Promise<Project | null> {
        if (PlatformDispatcher.IsDesktop()) {
            return await TauriProjectPlugin.GetProjectLight(projectUid)
        } else {
            alert("GetProjectLight is not implemented for web")
        }
        return null
    }

    static async UploadProjectLightData(params: Project): Promise<boolean> {
        if (PlatformDispatcher.IsDesktop()) {
            return await TauriProjectPlugin.UploadProjectLightData(params)
        } else {
            alert("GetProjectLight is not implemented for web")
        }
        return true
    }


}
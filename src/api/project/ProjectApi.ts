import { CreateProjectParams } from "./params";
import PlatformDispatcher from "../PlatformDispatcher";

import { ProjectLight } from "@data/project/ProjectLight";
import TauriProjectPlugin from "../../tauri/plugin_project";
import axios from "axios";


export default class ProjectApi {


    static async ActivateProject(projectUid: string): Promise<ProjectLight | null> {
        if (PlatformDispatcher.IsDesktop()) {
            const result = await TauriProjectPlugin.ActivateProject(projectUid)
            await new Promise(resolve => setTimeout(resolve, 1000));

            return result
        } else {
            //
        }

        return null
    }

    static async CreateProject(params: CreateProjectParams): Promise<string> {
        if (PlatformDispatcher.IsDesktop()) {
            return await TauriProjectPlugin.CreateProject(params)
        } else {
            await axios.post("/api/projects/create-project", null, {
                params: params
            }).catch((e) => {
                console.log(e.request.responseText)
            })
            return ""
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

    static async ListProjects(): Promise<Array<ProjectLight>> {
        if (PlatformDispatcher.IsDesktop()) {
            return await TauriProjectPlugin.ListProjects()
        } else {
            const data = await axios.get("/api/projects/list-projects")
            console.log(data)
            return ProjectLight.ArrayFromJsonArray(data.data)
        }

    }

    static async GetProjectLight(projectUid: string): Promise<ProjectLight | null> {
        if (PlatformDispatcher.IsDesktop()) {
            return await TauriProjectPlugin.GetProjectLight(projectUid)
        } else {
            alert("GetProjectLight is not implemented for web")
        }
        return null
    }

    static async UploadProjectLightData(params: CreateProjectParams): Promise<boolean> {
        if (PlatformDispatcher.IsDesktop()) {
            return await TauriProjectPlugin.UploadProjectLightData(params)
        } else {
            alert("GetProjectLight is not implemented for web")
        }
        return true
    }


}
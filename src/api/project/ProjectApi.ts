import {CreateProjectParams} from "./params";
import ApiDispatcher from "../ApiDispatcher";

import {ProjectLight} from "@data/project/ProjectLight";
import TauriProjectPlugin from "../../tauri/plugin_project";


export default class ProjectApi {


    static async ActivateProject(projectUid: string): Promise<ProjectLight | null> {
        if (ApiDispatcher.IsDesktop()) {
            const result = await TauriProjectPlugin.ActivateProject(projectUid)

            await new Promise(resolve => setTimeout(resolve, 1000));

            return result
        } else {
            //
        }

        return null
    }

    static async CreateProject(params: CreateProjectParams): Promise<boolean> {
        if (ApiDispatcher.IsDesktop()) {
            return await TauriProjectPlugin.CreateProject(params)
        } else {
            alert("Create project is unimplemented for WEB")
        }
        return false
    }


    static async DeleteProject(projectUid: string): Promise<boolean> {
        if (ApiDispatcher.IsDesktop()) {
            return await TauriProjectPlugin.DeleteProject(projectUid)
        } else {
            alert("Create project is unimplemented for WEB")
        }
        return false
    }


    static async GetAndActivateProject(projectUid: string): Promise<boolean> {
        if (ApiDispatcher.IsDesktop()) {
            return await TauriProjectPlugin.GetAndActivateProject(projectUid)
        } else {
            alert("Create project is unimplemented for WEB")
        }
        return false
    }

    static async ListProjects(): Promise<Array<ProjectLight>> {
        if (ApiDispatcher.IsDesktop()) {
            return await TauriProjectPlugin.ListProjects()
        } else {
            alert("ListProjects is not implemented for web")
        }
        return []
    }

    static async GetProjectLight(projectUid: string): Promise<ProjectLight | null> {
        if (ApiDispatcher.IsDesktop()) {
            return await TauriProjectPlugin.GetProjectLight(projectUid)
        } else {
            alert("GetProjectLight is not implemented for web")
        }
        return null
    }

    static async UploadProjectLightData(params: CreateProjectParams): Promise<boolean> {
        if (ApiDispatcher.IsDesktop()) {
            return await TauriProjectPlugin.UploadProjectLightData(params)
        } else {
            alert("GetProjectLight is not implemented for web")
        }
        return true
    }

}
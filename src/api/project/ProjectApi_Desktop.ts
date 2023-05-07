import {CreateProjectParams} from "./data";


import ApiDispatcher from "../ApiDispatcher";
import TauriProjectPlugin from "../../tauri/plugin_project";
import {ProjectLight} from "@data/project/ProjectLight";

export default class ProjectApi_Desktop {

    static async CreateProject(params: CreateProjectParams): Promise<boolean> {
        const data = await TauriProjectPlugin.CreateProject(params)
        return true
    }

    static async ListProjects(): Promise<Array<ProjectLight>> {
        return await TauriProjectPlugin.ListProjects()
    }

}
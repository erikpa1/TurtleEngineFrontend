import {CreateProjectParams} from "./data";


import ApiDispatcher from "../ApiDispatcher";
import TauriProjectPlugin from "../../tauri/plugin_project";

export default class ProjectApi_Desktop {

    static async CreateProject(params: CreateProjectParams): Promise<boolean> {

        const data = await TauriProjectPlugin.CreateProject(params)

        console.log(data)

        return true
    }

}
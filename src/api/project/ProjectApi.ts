import {CreateProjectParams} from "./data";
import ApiDispatcher from "../ApiDispatcher";
import ProjectApi_Desktop from "./ProjectApi_Desktop";
import {ProjectLight} from "@data/project/ProjectLight";


export default class ProjectApi {

    static async CreateProject(params: CreateProjectParams): Promise<boolean> {
        if (ApiDispatcher.IsDesktop()) {
            return await ProjectApi_Desktop.CreateProject(params)
        } else {
            alert("Create project is unimplemented for WEB")
        }
        return false
    }

    static async ListProjects(): Promise<Array<ProjectLight>> {
        if (ApiDispatcher.IsDesktop()) {
            return await ProjectApi_Desktop.ListProjects()
        } else {
            alert("List projects is not implemented for web")
        }
        return []
    }

}
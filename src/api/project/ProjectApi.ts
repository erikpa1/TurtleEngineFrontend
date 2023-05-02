import {CreateProjectParams} from "./data";
import ApiDispatcher from "../ApiDispatcher";
import ProjectApi_Desktop from "./ProjectApi_Desktop";


export default class ProjectApi {


    static async CreateProject(params: CreateProjectParams): Promise<boolean> {

        if (ApiDispatcher.IsDesktop()) {
            return await ProjectApi_Desktop.CreateProject(params)
        }

        return false
    }

}
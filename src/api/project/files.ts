import FsTools from "@api/FsTools";

export default class TurtleFile {

    name = ""
    path = ""
    full_path = ""
    modified_at = 0
    created_at = 0
    is_file = false


    ToJson() {
        return {
            name: this.name,
            path: this.path,
            is_file: this.is_file,
            modified_at: this.modified_at,
            created_at: this.created_at,
            full_path: this.full_path,
        }
    }

    FromJson(jObj: any) {
        this.name = jObj.name ?? ""
        this.path = jObj.path ?? ""
        this.is_file = jObj.is_file ?? false
        this.modified_at = jObj.modified_at ?? ""
        this.created_at = jObj.created_at ?? ""
        this.full_path = jObj.full_path ?? ""
    }

    Extension(): string {
        return FsTools.GetFileExtension(this.name)
    }

    Name(): string {
        return FsTools.GetFileNameAndExtension(this.path)
    }

    Preview(): string {
        const ext = this.Extension()

        if (ext === "glb") {
            return "/icons/Deployment.svg"
        } else if (ext === "turtlescene") {
            return "/icons/Scene.svg"
        }
        return "/icons/Projects.svg"
    }


}
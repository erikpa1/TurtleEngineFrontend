import FsTools from "@api/FsTools";

export default class TurtleFile {

    name = ""
    path = ""
    modified_at = ""
    created_at = ""
    created_by = ""
    preview = ""
    canBeDeleted = ""

    ToJson() {
        return {
            name: this.name,
            path: this.path,
            modified_at: this.modified_at,
            created_at: this.created_at,
            created_by: this.created_by,
            preview: this.preview,
        }
    }

    FromJson(jObj: any) {
        this.name = jObj.name ?? ""
        this.path = jObj.path ?? ""
        this.modified_at = jObj.modified_at ?? ""
        this.created_at = jObj.created_at ?? ""
        this.created_by = jObj.created_by ?? ""
        this.preview = jObj.preview ?? ""
        this.canBeDeleted = jObj.canBeDeleted ?? false
    }

    Extension(): string {
        return FsTools.GetFileExtension(this.name)
    }

    Name(): string {
        return FsTools.GetFileNameAndExtension(this.path)
    }

    Preview(): string {
        const ext = this.Extension()

        if (ext == "glb") {
            return "/icons/Deployment.svg"
        }
        return "/icons/Projects.svg"
    }


}
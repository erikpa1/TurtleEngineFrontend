export default class ProjectParent {

    name = "Project"
    description = "Description"
    author = "John Doe"
    type = "base"

    to_json(): any {
        return {
            name: this.name,
            description: this.description,
            author: this.author,
            type: this.type,
        }
    }


}
export default class TurtleScene {
    uid = ""
    name = ""
    parent = ""
    description = ""

    FromJson(jobj: any) {
        this.uid = jobj.uid
        this.name = jobj.name
        this.parent = jobj.parent
        this.description = jobj.description
    }

    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,
            parent: this.parent,
            description: this.description,
        }
    }

    static ArrayFromJsonArray(jarray: any): Array<TurtleScene> {
        const projects = jarray.map((value) => {
            const tmp = new TurtleScene()
            tmp.FromJson(value)
            return tmp
        })

        return projects
    }


}
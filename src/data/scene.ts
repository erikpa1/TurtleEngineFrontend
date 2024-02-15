export default class TurtleScene {


    name = ""
    uid = ""


    ToJson() {
        return {
            name: this.name,
            uid: this.uid
        }
    }

    FromJson(jobj: any) {
        this.name = jobj.name ?? ""
        this.uid = jobj.uid ?? ""
    }


}
export default class User {
    uid = ""
    org = ""
    name = "John"
    surname = "Doe"
    role = "admin"


    FromJson(jObj: any) {
        this.uid = jObj.uid
        this.org = jObj.org
        this.name = jObj.name
        this.surname = jObj.surname
        this.role = jObj.role
    }

}
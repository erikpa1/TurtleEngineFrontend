import Asset from "@platform/assets/Asset";

export default class TraningLevelDefinition {

    uid = crypto.randomUUID()
    type = "scene"
    lang = ""
    desciption = ""
    asset_uid = ""

    level_materials = new Array<Asset>()

    ToJson(): any {
        return {
            uid: this.uid,
            type: this.type,
            lang: this.lang,
            asset_uid: this.asset_uid
        }
    }

    FromJson(context, jobject: any) {
        this.uid = jobject.uid ?? ""
        this.type = jobject.uid ?? ""
        this.lang = jobject.lang ?? ""
        this.asset_uid = jobject.uid ?? ""
    }


}
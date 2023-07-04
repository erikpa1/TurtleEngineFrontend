import VirtualSceneDefinition from "@platform/assets/scenes/VirtualSceneDefinition";

export class PanoramaScenePhotoDomConfig {

}

export default class PanoramaSceneDefinition extends VirtualSceneDefinition {

    type = "panorama"

    panorama_uid = ""

    constructor() {
        super();
    }

    ToJson(): any {
        return {
            ...super.ToJson(),
            panorama_uid: this.panorama_uid
        }
    }

    FromJson(jObject: any | PanoramaSceneDefinition) {
        super.FromJson(jObject);
        this.panorama_uid = jObject.panorama_uid ?? ""
    }


}
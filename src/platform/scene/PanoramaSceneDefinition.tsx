import VirtualSceneDefinition from "@platform/scene/VirtualSceneDefinition";

export class PanoramaScenePhotoDomConfig {

}


export default class PanoramaSceneDefinition extends VirtualSceneDefinition {

    type = "panorama"

    panoramaUid = ""

    constructor() {
        super();
    }

    ToJson(): any {
        return {
            ...super.ToJson(),
            panoramaUid: this.panoramaUid
        }
    }

    FromJson(jObject: any | PanoramaSceneDefinition) {
        super.FromJson(jObject);
        this.panoramaUid = jObject.panoramaUid ?? ""
    }


}
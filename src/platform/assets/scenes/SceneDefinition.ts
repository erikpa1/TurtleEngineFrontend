import VirtualSceneDefinition from "@platform/assets/scenes/VirtualSceneDefinition.ts";
import {SceneNode} from "@platform/scene/SceneNode.ts";

export default class SceneDefinition {

    uid = ""
    root = new SceneNode()

    ToJson(): any {
        return {
            uid: this.uid,
            root: this.root
        }
    }

    FromJson(jObject: any) {
        this.uid = jObject.uid ?? ""
        this.root.FromJson(jObject.root ?? {})
    }


}
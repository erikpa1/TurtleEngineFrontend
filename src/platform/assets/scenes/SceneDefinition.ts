import {SceneNode} from "@platform/scene/SceneNode";
import {AssetData, ProjectSerializationContext} from "@platform/assets/Asset";

export default class SceneDefinition extends AssetData {

    root = new SceneNode()
    type = "base"

    ToJson(): any {
        return {
            ...super.ToJson(),
            root: this.root,
        }
    }

    FromJson(context: ProjectSerializationContext, jObject: any) {
        super.FromJson(context, jObject)

        this.root.FromJson(jObject.root ?? {})
    }


}
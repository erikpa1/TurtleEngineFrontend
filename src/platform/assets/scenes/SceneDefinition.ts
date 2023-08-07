import {SceneEntity} from "@platform/entities/SceneEntity";
import {AssetData, ProjectSerializationContext} from "@platform/assets/Asset";

export default class SceneDefinition extends AssetData {

    root = new SceneEntity()
    type = "base"

    ToJson(): any {
        return {
            ...super.ToJson(),
            root: this.root.ToJson(),
        }
    }

    FromJson(context: ProjectSerializationContext, jObject: any) {
        super.FromJson(context, jObject)

        this.root.FromJson(jObject.root ?? {})
    }


}
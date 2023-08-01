import Assets from "@platform/assets/Assets";
import Asset from "@platform/assets/Asset";
import {VideoEntity} from "@platform/entities/media/VideoEntity";
import {SceneMeshNode} from "@platform/entities/world/SceneMeshNode";
import SceneDefinition from "@platform/assets/scenes/SceneDefinition";

export default class VirtualSceneDefinition extends SceneDefinition {

    type = "virtual"

    constructor() {
        super()
    }

    FromJson(context: any, jObject: any) {
        super.FromJson(context, jObject)

    }

    ToJson() {
        return {
            ...super.ToJson(),
        }
    }

    AddAssetChildren(asset: Asset) {
        //TODO Toto zautomatizovat

        if (asset.type === Assets.Mesh.TYPE) {
            const tmp = new SceneMeshNode()
            tmp.content_uid = asset.uid
            this.root.children.push(tmp)
        } else if (asset.type === Assets.Video.TYPE) {
            const tmp = new VideoEntity()
            tmp.content_uid = asset.uid
            this.root.children.push(tmp)
        }

        if (this.root.onChildrenChanged) {
            this.root.onChildrenChanged()
        }
    }

    DeleteChildrenWithUid(nodeUid: string) {

        this.root.children = this.root.children.filter(value => value.uid !== nodeUid)

        if (this.root.onChildrenChanged) {
            this.root.onChildrenChanged()
        }

    }


}


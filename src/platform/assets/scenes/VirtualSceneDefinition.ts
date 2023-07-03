import {SceneNode} from "@platform/scene/SceneNode";


import Assets from "@platform/assets/Assets";
import Asset from "@platform/assets/Asset";
import {SceneVideoNode} from "@platform/scene/media/SceneVideoNode";
import {SceneMeshNode} from "@platform/scene/world/SceneMeshNode";
import SceneDefinition from "@platform/assets/scenes/SceneDefinition";

export default class VirtualSceneDefinition extends SceneDefinition {

    type = "virtual"

    constructor() {
        super()
    }

    FromJson(jObject: any) {
        super.FromJson(jObject)
    }

    ToJson() {
        return {
            ...super.ToJson()
        }
    }

    AddAssetChildren(asset: Asset) {
        //TODO Toto zautomatizovat

        if (asset.type === Assets.Mesh.TYPE) {
            const tmp = new SceneMeshNode()
            tmp.content_uid = asset.uid
            this.root.children.push(tmp)
        } else if (asset.type === Assets.Video.TYPE) {
            const tmp = new SceneVideoNode()
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


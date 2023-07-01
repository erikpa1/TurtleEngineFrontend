import {SceneNode} from "@platform/scene/SceneNode";


import Assets from "@platform/assets/Assets";
import Asset from "@platform/assets/Asset.ts";
import {SceneVideoNode} from "@platform/scene/media/SceneVideoNode.tsx";
import {SceneMeshNode} from "@platform/scene/world/SceneMeshNode.tsx";

export default class VirtualSceneDefinition {
    root: SceneNode
    type = "virtual"

    constructor() {
        this.root = new SceneNode()
    }

    FromJson(jObject: any) {
        this.root.FromJson(jObject.root ?? {})
    }

    ToJson() {
        return {
            type: this.type,
            root: this.root.ToJson()
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


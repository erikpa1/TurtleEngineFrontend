import {SceneNode} from "@platform/scene/SceneNode";
import AssetParent from "@platform/assets/AssetParent";
import MeshAsset from "@platform/assets/MeshAsset";

import AssetParentLight from "@platform/assets/AssetParentLight";
import {Assets} from "@platform/assets/Assets";
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

    AddAssetChildren(asset: AssetParentLight) {
        //TODO Toto zautomatizovat

        if (asset.assetType === Assets.Mesh.TYPE) {
            const tmp = new SceneMeshNode()
            tmp.content_uid = asset.uid
            this.root.children.push(tmp)
        } else if (asset.assetType === Assets.Video.TYPE) {
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


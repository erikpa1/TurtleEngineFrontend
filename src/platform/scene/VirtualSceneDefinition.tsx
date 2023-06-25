import {SceneNode} from "@platform/scene/SceneNode";
import AssetParent from "@platform/assets/AssetParent";
import MeshAsset from "@platform/assets/MeshAsset";
import {SceneMeshNode} from "@platform/scene/SceneMeshNode";
import AssetParentLight from "@platform/assets/AssetParentLight";
import {Assets} from "@platform/assets/Assets";

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

        if (asset.assetType === Assets.Mesh.TYPE) {
            const tmp = new SceneMeshNode()
            tmp.meshUid = asset.uid
            this.root.children.push(tmp)
        }


    }


}


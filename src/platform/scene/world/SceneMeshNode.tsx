import React from "react";

import MeshAsset from "@platform/assets/MeshAsset";
import {PrimitiveMesh, PrimitiveMeshEditable} from "@components/assets/mesh/PrimitiveMesh";
import {useActiveProjectZus} from "@platform/zustands/projectZuses";
import AssetsApi from "@api/AssetsApi";
import {Assets} from "@platform/assets/Assets";
import {SceneNode} from "@platform/scene/SceneNode";
import SceneNodeMover from "@components/assets/tools/SceneNodeMover.tsx";


export class SceneMeshNode extends SceneNode {

    static TYPE = "mesh"
    content_uid = ""

    type = SceneMeshNode.TYPE

    constructor() {
        //pass
        super()
    }


    FromJson(jObject: any | SceneMeshNode) {
        super.FromJson(jObject);
        this.content_uid = jObject.content_uid ?? ""
    }

    ToJson(): any {
        return {
            ...super.ToJson(),
            content_uid: this.content_uid
        }
    }

}

interface SceneMeshViewProps {
    node: SceneMeshNode
}

export function SceneMeshNodeView({node}: SceneMeshViewProps) {

    const projectZus = useActiveProjectZus()

    const [meshAsset, setMeshAsset] = React.useState<MeshAsset | null>(null)

    React.useEffect(() => {

        AssetsApi.GetAssetData<MeshAsset>(Assets.Mesh, projectZus.project.uid, node.content_uid).then((value) => {
            setMeshAsset(value)
        })
    }, [node.content_uid])


    if (meshAsset) {
        return (
            <_SceneMeshView mesh={node} meshAsset={meshAsset}/>
        )
    } else {
        return (
            <></>
        )
    }


}

interface _SceneMeshViewProps {
    mesh: SceneMeshNode
    meshAsset: MeshAsset
}

function _SceneMeshView({meshAsset, mesh}: _SceneMeshViewProps) {

    return (
        <SceneNodeMover node={mesh}>
            <PrimitiveMesh
                meshPath={meshAsset.GetEntryFile()}
            />
        </SceneNodeMover>


    )
}



import React from "react";

import {MeshAssetData} from "@platform/assets/mesh.ts";
import {PrimitiveMesh} from "@components/assets/mesh/PrimitiveMesh";
import {useActiveProjectZus} from "@platform/zustands/projectZuses";

import {SceneNode} from "@platform/scene/SceneNode";
import SceneNodeMover from "@components/assets/tools/SceneNodeMover.tsx";
import AssetsApi from "@api/AssetsApi.ts";


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

    const [meshAsset, setMeshAsset] = React.useState<MeshAssetData | null>(null)

    React.useEffect(() => {

        AssetsApi.GetAssetData<MeshAssetData>(MeshAssetData, projectZus.project.uid, node.content_uid).then((value) => {
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
    meshData: MeshAssetData
}

function _SceneMeshView({meshData, mesh}: _SceneMeshViewProps) {


    return (
        <SceneNodeMover node={mesh}>
            {
                meshData.meshExtension !== "" && <PrimitiveMesh
                    meshPath={meshData.GetEntryFile()}
                />
            }

        </SceneNodeMover>


    )
}



import React from "react";

import {MeshAssetData} from "@platform/assets/mesh";
import {PrimitiveMesh} from "@components/assets/mesh/PrimitiveMesh";
import {useActiveProjectZus} from "@platform/zustands/projectZuses";

import {SceneEntity} from "@platform/entities/SceneEntity";
import SceneNodeMover from "@components/assets/tools/SceneNodeMover";
import AssetsApi from "@api/AssetsApi";
import Asset from "@platform/assets/Asset";


export class SceneMeshNode extends SceneEntity {

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

    const [meshAsset, setMeshAsset] = React.useState<Asset | null>(null)

    React.useEffect(() => {
        AssetsApi.GetAssetAndAssetData(MeshAssetData, projectZus.project.uid, node.content_uid).then((value) => {
            setMeshAsset(value)
        })
    }, [node.content_uid])

    if (meshAsset) {
        return (
            <_SceneMeshView meshNode={node} meshData={meshAsset.data}/>
        )
    } else {
        return (
            <></>
        )
    }


}

interface _SceneMeshViewProps {
    meshNode: SceneMeshNode
    meshData: MeshAssetData
}

function _SceneMeshView({meshNode, meshData}: _SceneMeshViewProps) {


    return (
        <SceneNodeMover node={meshNode}>
            {
                meshData.mesh_extension !== "" && <PrimitiveMesh
                    meshPath={meshData.GetEntryFile()}
                />
            }

        </SceneNodeMover>


    )
}



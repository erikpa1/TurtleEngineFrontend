import React from "react";

import MeshAsset from "@platform/assets/MeshAsset";
import {PrimitiveMeshEditable} from "@components/assets/mesh/PrimitiveMesh";
import {useActiveProjectZus} from "@platform/zustands/projectZuses";
import AssetsApi from "@api/AssetsApi";
import {Assets} from "@platform/assets/Assets";
import {SceneNode} from "@platform/scene/SceneNode";


export class SceneMeshNode extends SceneNode {

    static TYPE = "mesh"
    meshUid = ""

    type = SceneMeshNode.TYPE

    constructor() {
        //pass
        super()
    }


    FromJson(jObject: any | SceneMeshNode) {
        super.FromJson(jObject);
        this.meshUid = jObject.meshUid ?? ""
    }

    ToJson(): any {
        return {
            ...super.ToJson(),
            meshUid: this.meshUid
        }
    }

}

interface SceneMeshViewProps {
    mesh: SceneMeshNode
}

export function SceneMeshView({mesh}: SceneMeshViewProps) {

    const projectZus = useActiveProjectZus()

    const [meshAsset, setMeshAsset] = React.useState<MeshAsset | null>(null)

    React.useEffect(() => {

        AssetsApi.GetAssetData<MeshAsset>(Assets.Mesh, projectZus.project.uid, mesh.meshUid).then((value) => {
            console.log(value)
            setMeshAsset(value)
        })
    }, [mesh.meshUid])


    if (meshAsset) {
        return (
            <_SceneMeshView mesh={mesh} meshAsset={meshAsset}/>
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

    function positionChanging(newPosition: number[]) {
        mesh.position = newPosition as any
    }

    return (
        <PrimitiveMeshEditable
            position={mesh.position}
            rotation={mesh.rotation}
            meshPath={meshAsset.GetEntryFile()}
            onPositionChanged={positionChanging}
        />

    )
}



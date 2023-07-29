import React from "react";
import Asset from "@platform/assets/Asset";
import {MeshAssetData} from "@platform/assets/mesh";

import {
    UniversalMeshCanvas, UniversalMeshOrbitControls,
    UniversalWorldEnvironment,
    UniversalWorldGrid
} from "@components/assets/canvases/UniversalMeshCanvas";

import SceneCameraRotationGizmo from "@components/assets/canvases/SceneCameraRotationGizmo";
import {PrimitiveMesh} from "@components/assets/mesh/PrimitiveMesh";
import {TGui} from "@external/tgui";

interface MeshAssetPlayerProps {
    asset: Asset
}

export default function MeshAssetPlayer({asset}: MeshAssetPlayerProps) {

    const _mesh: MeshAssetData = asset.data

    function zoomPressed() {
        alert("Mesh player zoom is not implemented")
    }

    return (
        <div style={{position: "relative"}}>
            <UniversalMeshCanvas>

                <UniversalWorldEnvironment/>
                <SceneCameraRotationGizmo/>

                <UniversalMeshOrbitControls/>
                <UniversalWorldGrid/>

                <PrimitiveMesh meshPath={_mesh.GetEntryFile()}/>

            </UniversalMeshCanvas>

            <div style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                borderRadius: "15%",
                padding: "5px"
            }}>
                <TGui.IconClickButton
                    image={"/icons/Magnifier.White.svg"}
                    size={"1em"}
                    onClick={zoomPressed}
                />

            </div>


        </div>
    )
}
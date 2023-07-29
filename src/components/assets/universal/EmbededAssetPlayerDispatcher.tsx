import React from "react";
import Asset from "@platform/assets/Asset";
import MeshAssetPlayer from "@components/assets/mesh/MeshAssetPlayer";
import Assets from "@platform/assets/Assets";


interface EmbededAssetPlayerDispatcherProps {
    asset: Asset
}

export default function EmbededAssetPlayerDispatcher({asset}: EmbededAssetPlayerDispatcherProps) {
    return (
        <div>
            {
                asset.type === Assets.Mesh.TYPE &&
                <MeshAssetPlayer asset={asset}/>
            }
        </div>
    )
}
import {PrimitiveMesh} from "@components/assets/mesh/PrimitiveMesh";


interface AreaSpotProps {
    position: [number, number, number]
    scale?: [number, number, number]
}

export default function AreaMarker({position, scale}: AreaSpotProps) {
    return (
        <PrimitiveMesh
            position={position}
            scale={scale ?? [1, 1, 1]}
            meshPath={"/meshes/spot3d.glb"}
        />
    )
}
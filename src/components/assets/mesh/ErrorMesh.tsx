import {useGLTF} from "@react-three/drei";
import React from "react";

export function ErrorMesh() {
    const gltf = useGLTF("/meshes/error.glb", true)

    return (
        <React.Suspense fallback={null}>
            <primitive object={gltf.scene}/>
        </React.Suspense>
    )
}
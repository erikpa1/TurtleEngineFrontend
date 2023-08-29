import {PrimitiveMesh} from "@components/assets/mesh/PrimitiveMesh";
import FsTools from "@api/FsTools";
import React from "react";


export default function VtsTestScenario({}) {
    return (
        <group>
            <_Vyvod position={[0, 0, 0]}/>
            <_Vyvod position={[10, 0, 0]}/>
            <_Vyvod position={[20, 0, 0]}/>
            <_Vyvod position={[30, 0, 0]}/>
            <_Vyvod position={[40, 0, 0]}/>
        </group>
    )
}


function _Vyvod({position}) {
    return (
        <group position={position}>
            <_Q5 position={[0, 0, 15]}/>
            <_PodporneStlpy position={[0, 0, 13]}/>
            <_Q5 position={[0, 0, 11]}/>
            <_PodporneStlpy position={[0, 0, 9]}/>
            <_Q5 position={[0, 0, 7]}/>

            <_VyvodovyOdpojovac position={[0, 0, -5]}/>

            <_Izolator position={[0, 0, -2]}/>

            <_CircuitBreaker position={[0, 0, 1]}/>
        </group>
    )
}

function _PodporneStlpy({position}) {
    return (
        <group position={position ?? [0, 0, 0]}>
            <PrimitiveMesh
                meshPath={FsTools.GetProjectsPath("/vts/Meshes/Podporny stlp.glb")}
                position={[-4, 0, 0]}
            />
            <PrimitiveMesh
                meshPath={FsTools.GetProjectsPath("/vts/Meshes/Podporny stlp.glb")}
                position={[0, 0, 0]}
            />
            <PrimitiveMesh
                meshPath={FsTools.GetProjectsPath("/vts/Meshes/Podporny stlp.glb")}
                position={[-2, 0, 0]}
            />
        </group>

    )
}

function _VyvodovyOdpojovac({position}) {
    return (
        <group position={position ?? [0, 0, 0]}>
            <PrimitiveMesh
                meshPath={FsTools.GetProjectsPath("/vts/Meshes/Vyvodovy odpojovac.glb")}
                position={[-2, 0, 0]}
                rotation={[0, Math.PI / 2, 0]}
            />

        </group>
    )
}

function _CircuitBreaker({position}) {
    return (
        <group position={position ?? [0, 0, 0]}>
            <PrimitiveMesh
                meshPath={FsTools.GetProjectsPath("/vts/Meshes/Circuit breaker.glb")}
                position={[-2, 0, 0]}
                rotation={[0, Math.PI / 2, 0]}
            />

        </group>
    )
}

function _Q5({position}) {
    return (
        <group position={position ?? [0, 0, 0]}>
            <PrimitiveMesh
                meshPath={FsTools.GetProjectsPath("/vts/Meshes/Q5.glb")}
                position={[-2, 0, 0]}
                rotation={[0, Math.PI / -2, 0]}
            />

        </group>
    )
}


function _Izolator({position}) {
    return (
        <group position={position ?? [0, 0, 0]}>
            <PrimitiveMesh
                meshPath={FsTools.GetProjectsPath("/vts/Meshes/Izolator.glb")}
                position={[-4, 0, 0]}
                rotation={[0, Math.PI / -2, 0]}
            />
            <PrimitiveMesh
                meshPath={FsTools.GetProjectsPath("/vts/Meshes/Izolator.glb")}
                position={[0, 0, 0]}
                rotation={[0, Math.PI / -2, 0]}
            />
            <PrimitiveMesh
                meshPath={FsTools.GetProjectsPath("/vts/Meshes/Izolator.glb")}
                position={[-2, 0, 0]}
                rotation={[0, Math.PI / -2, 0]}
            />
        </group>

    )
}
import React from "react";
import * as three from "three";

export function DnDBox3D({}) {


    return (
        <group>

            <_AnchorBox position={[0, 0, 0]}/>
            <_AnchorBox position={[0, 1, 0]}/>

            <_AnchorBox position={[1, 0, 0]}/>
            <_AnchorBox position={[1, 1, 0]}/>

            <_AnchorBox position={[0, 0, 1]}/>
            <_AnchorBox position={[0, 1, 1]}/>

            <_AnchorBox position={[1, 0, 1]}/>
            <_AnchorBox position={[1, 1, 1]}/>

            <_AnchorLine position={[0.5, 0, 0]} rotation={[0, 0, 0]}/>
            <_AnchorLine position={[0.5, 0, 1]} rotation={[0, 0, 0]}/>

            <_AnchorLine position={[0.5, 1, 0]} rotation={[0, 0, 0]}/>
            <_AnchorLine position={[0.5, 1, 1]} rotation={[0, 0, 0]}/>

            <_AnchorLine position={[1, 0, 0.5]} rotation={[0, Math.PI / 2, 0]}/>
            <_AnchorLine position={[0, 0, 0.5]} rotation={[0, Math.PI / 2, 0]}/>

            <_AnchorLine position={[1, 1, 0.5]} rotation={[0, Math.PI / 2, 0]}/>
            <_AnchorLine position={[0, 1, 0.5]} rotation={[0, Math.PI / 2, 0]}/>

            <_AnchorLine position={[1, 0.5, 1]} rotation={[0, 0, Math.PI / 2]}/>
            <_AnchorLine position={[0, 0.5, 1]} rotation={[0, 0, Math.PI / 2]}/>
            <_AnchorLine position={[1, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}/>
            <_AnchorLine position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}/>
        </group>
    )
}

function _AnchorBox({position}) {
    return (
        <mesh position={position} visible={true} scale={[1, 1, 1]}>
            <boxGeometry args={[0.05, 0.05, 0.05]}/>
            <meshBasicMaterial
                color={"#d06972"}

            />

        </mesh>
    )
}

function _AnchorLine({position, rotation}) {
    return (
        <mesh position={position}
              visible={true}
              scale={[1, 1, 1]}
              rotation={rotation}
        >
            <boxGeometry args={[1, 0.01, 0.01]}/>
            <meshBasicMaterial
                color={"#336abd"}
            />

        </mesh>
    )
}
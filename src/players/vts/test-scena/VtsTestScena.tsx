import {Canvas} from "@react-three/fiber";

import React from "react";
import {
    UniversalMeshOrbitControls,
    UniversalWorldEnvironment,
    UniversalWorldGrid
} from "@components/assets/canvases/UniversalMeshCanvas";
import SceneCameraRotationGizmo from "@components/assets/canvases/SceneCameraRotationGizmo";

import VtsTestScenario from "@players/vts/test-scena/VtsTestScenario";
import {PhysicalAvatarEntity, PhysicsAvatarEntityView} from "@platform/entities/physics/PhysicsAvatarEntity";
import {PhysicalPlaneEntity, PhysicsPlaneEntityView} from "@platform/entities/physics/PhysicsPlaneEntity";


import {Physics} from "@react-three/cannon";
import {KeyboardControls} from "@react-three/drei";
import {VtsAvatarControlsMaps} from "@platform/entities/physics/PhysicsAvatarControls";


export default function VtsTestScena({}) {

    const avatar = new PhysicalAvatarEntity()

    const plane = new PhysicalPlaneEntity()

    return (

        <KeyboardControls map={VtsAvatarControlsMaps}>
            <div style={{
                backgroundColor: "#303035"
            }}>

                <Canvas
                    shadows
                    className={"gl-canvas"}

                    camera={{
                        far: 10000,
                        position: [4, 3, 12]
                    }}

                    style={{
                        height: "100vh",
                    }}
                    raycaster={{params: {Line: {threshold: 0.15}}}}
                >

                    <Physics gravity={[0, -9.81, 0]} debug={true}>

                        <PhysicsPlaneEntityView node={plane}/>

                        <PhysicsAvatarEntityView node={avatar}/>

                    </Physics>
                    <UniversalWorldEnvironment/>
                    <SceneCameraRotationGizmo/>

                    {/*<UniversalMeshOrbitControls/>*/}
                    <UniversalWorldGrid/>


                    <directionalLight castShadow position={[2.5, 5, 5]} intensity={1.5} shadow-mapSize={[1024, 1024]}>
                        <orthographicCamera attach="shadow-camera" args={[-5, 5, 5, -5, 1, 50]}/>
                    </directionalLight>

                    <VtsTestScenario/>
                </Canvas>
            </div>
        </KeyboardControls>


    )
}



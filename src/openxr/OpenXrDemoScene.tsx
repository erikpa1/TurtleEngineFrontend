import React from "react";
import {Canvas, useFrame, useThree} from "@react-three/fiber";

import * as three from "three"


import {XR, Hands, Controllers, VRButton, TeleportationPlane, useTeleportation} from "@react-three/xr";
import {Environment, OrbitControls} from "@react-three/drei";
import {PrimitiveMesh} from "@components/assets/mesh/PrimitiveMesh";
import FsTools from "@api/FsTools";
import {UniversalWorldGrid} from "@components/assets/canvases/UniversalMeshCanvas";
import {Box} from "@mui/material";


export default function OpenXrDemoScene({}) {
    return (
        <div style={{
            position: "relative",
            height: "100vh",
            background: "#272730",
            overflowY: "hidden",
            overflowX: "hidden",
            touchAction: "none"
        }}>

            {
                "xr" in navigator &&
                <VRButton

                    //     style={{
                    //     position: "absolute",
                    //     left: "50%",
                    //     top: "50%",
                    //     transform: "translate(-50%, -50%)"
                    // }}
                />
            }

            <Canvas shadows
                    className={"gl-canvas"}>

                <UniversalWorldGrid/>

                <React.Suspense fallback={""}>
                    <Environment
                        files={"/textures/venice_sunset_1k.hdr"}
                    />
                </React.Suspense>

                <OrbitControls makeDefault
                               target={[0, 0, 0]}
                               enableDamping={false}
                               maxPolarAngle={Math.PI / 2}
                />


                <_VRWrapper>

                    <_XRScene/>

                    <TeleportationPlane
                        /** Whether to allow teleportation from left controller. Default is `false` */
                        leftHand={true}
                        /** Whether to allow teleportation from right controller. Default is `false` */
                        rightHand={true}
                        /** The maximum distance from the camera to the teleportation point. Default is `10` */
                        maxDistance={10}
                        /** The radial size of the teleportation marker. Default is `0.25` */
                        size={0.25}
                    />


                </_VRWrapper>


            </Canvas>


        </div>
    )
}

function _VRWrapper({children}) {

    if ("xr" in navigator) {
        return (

            <XR>
                <Controllers/>
                <Hands/>
                {children}
            </XR>
        )
    } else {
        return children
    }
}

function _XRScene({}) {

    const {gl} = useThree()

    const teleport = useTeleportation()

    React.useEffect(() => {

        const _tmp: three.WebGLRenderer = gl

        teleport([0, 2, 0])

        if (_tmp.xr) {
            const _grip = _tmp.xr.getControllerGrip(0)

            if (_grip) {
                _grip.addEventListener("selectstart", () => {

                    teleport([0, 2, 0])
                })
                _grip.addEventListener("squeezestart", () => {

                    teleport([0, 2, 0])
                })
            }


        }


    })

    return (
        <group position={[-2.5, 0, 0]}>
            <group position={[10, 3.65, 0]}>
                <PrimitiveMesh
                    meshPath={"/XrDemo/museum.glb"}/>
            </group>

            <_Planet
                path={"/XrDemo/jupiter.glb"}
                position={[7, 0.5, 0]}
            />
            <_Planet
                path={"/XrDemo/earth.glb"}
                position={[7, 0.25, -4]}
            />

            <PrimitiveMesh
                meshPath={"/XrDemo/shelves.glb"}
                position={[0, 0.07, 0]}
            />

            <PrimitiveMesh
                meshPath={"/XrDemo/911-transformed.glb"}
                position={[3, 0.65, -5]}
                rotation={[0, Math.PI / 2, 0]}
            />

        </group>

    )
}


function _Planet({path, position}) {

    const meshRef = React.useRef<any>()


    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.1
        }
    })

    return (
        <group ref={meshRef} position={position}>
            <PrimitiveMesh
                meshPath={path}
            />
        </group>
    )
}
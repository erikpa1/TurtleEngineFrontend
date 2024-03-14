import React from "react"
import FsTools from "@api/FsTools"
import WorldCanvasWrapper from "../../world/WorldCanvasWrapper"
import {PrimitiveMesh} from "../../world/PrimitiveMesh"

import {useSceneViewTopBar} from "@views/scene3d/Scene3D_TopBar"

import {useSceneModules} from "@views/scene3d/scene_modules";

import {Docking_WorldView, TabScrollWrapper, TabScrollWrapperNoMargins} from "@components/docking/docking"


export default function Scene3DView({}) {

    const topBar = useSceneViewTopBar()

    return (
        <div>

            <Docking_WorldView
                headings={topBar}
                tabulators={[
                    {
                        size: 200,
                        tabs: [
                            {
                                content: (
                                    <TabScrollWrapperNoMargins>
                                        <div>Hothing</div>
                                    </TabScrollWrapperNoMargins>

                                ),
                                title: "Some View",
                                id: "Some View",
                            }
                        ],
                    },
                    {
                        size: 1000,
                        tabs: [
                            {
                                title: "3D World",
                                id: "3D World",
                                content: (<_3DView/>)
                            }
                        ]
                    },
                    {
                        size: 200,
                        tabs: [
                            {
                                content: (
                                    <TabScrollWrapper>
                                        <div>Nothing</div>
                                    </TabScrollWrapper>

                                ),
                                title: "Scene",
                                id: "Scene",
                            },
                            {
                                content: (
                                    <TabScrollWrapperNoMargins>
                                        <div>Nothing</div>
                                    </TabScrollWrapperNoMargins>

                                ),
                                title: "Edit",
                                id: "Edit",
                            }
                        ],
                    },
                ]}
            />


            {/*<Scene3D_TopBar/>*/}

            {/*<Scene3D_BottomBar/>*/}
        </div>
    )
}

function _3DView({}) {
    return (
        <WorldCanvasWrapper>
            <_SceneContent/>
        </WorldCanvasWrapper>
    )
}

function _SceneContent() {

    const modules = useSceneModules()

    return (
        <group>
            <PrimitiveMesh
                position={[1, 0.1, 1]}
                scale={[10, 10, 10]}
                rotation={[Math.PI / -2, 0, 0]}
                meshPath={FsTools.ConvertFilePath(FsTools.GetPathInProject("/Exercise 2.glb"))}/>
            {
                Array.from(modules.modules.values()).map((val, index) => {
                    return (
                        <React.Fragment key={index}>
                            {val}
                        </React.Fragment>
                    )
                })
            }

        </group>
    )
}


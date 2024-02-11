import React from "react";
import FsTools from "@api/FsTools";
import WorldCanvasWrapper from "../../world/WorldCanvasWrapper";
import {PrimitiveMesh} from "../../world/PrimitiveMesh";
import SidebarLayout from "@components/SidebarLayout";

import Scene3DTopBar from "@views/scene3d/Scene3D_TopBar";
import {TreeItem, TreeView} from "@mui/lab";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightSharp from '@mui/icons-material/ChevronRightSharp'

import Stack from "@mui/material/Stack";
import Scene3D_SideBar from "@views/scene3d/Scene3D_SideBar";
import {useSceneModules} from "@views/scene3d/scene_modules";


export default function Scene3DView({}) {

    console.log(FsTools.GetPathInProject("/Exercise 2.glb"))

    return (
        <div style={{
            height: "100vh",
            flexDirection: "column",
            display: "flex"
        }}>

            <Scene3DTopBar/>
            <div style={{
                flex: 1
            }}>
                <SidebarLayout>
                    <_3DView/>

                    <Scene3D_SideBar/>

                </SidebarLayout>
            </div>

        </div>
    )
}

function _3DView({}) {
    return (
        <div style={{
            height: "100%"
        }}>
            <WorldCanvasWrapper>
                <_SceneContent/>
            </WorldCanvasWrapper>
        </div>
    )
}

function _SceneContent() {

    const modules = useSceneModules()

    return (
        <group>
            <PrimitiveMesh
                scale={[100, 100, 100]}
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


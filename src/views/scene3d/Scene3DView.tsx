import React from "react";
import FsTools from "@api/FsTools";
import WorldCanvasWrapper from "../../world/WorldCanvasWrapper";
import {PrimitiveMesh} from "../../world/PrimitiveMesh";
import SidebarLayout from "@components/SidebarLayout";

import Scene3D_TopBar from "@views/scene3d/Scene3D_TopBar";
import {TreeItem, TreeView} from "@mui/lab";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightSharp from '@mui/icons-material/ChevronRightSharp'

import Stack from "@mui/material/Stack";
import Scene3D_SideBar from "@views/scene3d/Scene3D_SideBar";
import {useSceneModules} from "@views/scene3d/scene_modules";
import Scene3D_BottomBar from "@views/scene3d/Scene3D_BottomBar";
import anyEventEmmiter from "@components/AnyEventEmmiter";
import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";
import ProjectApi from "@api/project/ProjectApi";
import TauriSqlitePlugin from "../../tauri/plugin_storage";
import TauriStoragePlugin from "../../tauri/plugin_storage";


export default function Scene3DView({}) {

    const locker = useGlobalAppLock()

    async function save(e) {
        e.preventDefault()
        locker.lock()
        await ProjectApi.SaveProject()

        setTimeout(() => {
            locker.unlock()
        }, 1000)

    }

    async function testShortcut() {
        locker.lock()

        locker.unlock()

    }

    React.useEffect(() => {

        anyEventEmmiter.on("keydown-ctrl-s", save)
        anyEventEmmiter.on("keydown-ctrl-d", testShortcut)
        return () => {
            anyEventEmmiter.off("keydown-ctrl-s", save)
            anyEventEmmiter.off("keydown-ctrl-d", testShortcut)
        }

    }, [])

    return (
        <div style={{
            height: "100vh",
            flexDirection: "column",
            display: "flex"
        }}>

            <Scene3D_TopBar/>

            <div style={{
                flex: 1
            }}>
                <SidebarLayout>
                    <_3DView/>

                    <Scene3D_SideBar/>

                </SidebarLayout>
            </div>

            <Scene3D_BottomBar/>
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


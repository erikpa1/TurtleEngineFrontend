import React from "react";
import MainNavBar from "./MainNavBar";
import {ProSidebarProvider} from "react-pro-sidebar";

import {Route, Routes} from "react-router-dom";
import MountTabWrapper from "@components/MountTabWrapper";


const ProjectsSelectionView = React.lazy(() => import( "@components/projects/ProjectsSelectionView"))
const AssetsMainView = React.lazy(() => import("@components/assets/AssetsMainView"))
const AppManagementView = React.lazy(() => import("@editors/appmanagement/AppManagementView"))

const MapEditorMainView = React.lazy(() => import("@components/mapEditor/MapEditorMainView"))
const SceneEditorMainView = React.lazy(() => import("@components/sceneEditor/SceneEditorMainView"))

import MaterialEditor from "@components/assets/material/MaterialEditor";

export default function Main() {

    return (
        <div>
            <ProSidebarProvider>
                <MainNavBar/>
            </ProSidebarProvider>

            <div style={{flexGrow: 1}}>
                <_Main/>
            </div>
        </div>
    )
}

function _Main() {
    return (
        //The overflow Y and X is more important it could looks like at first see
        <main style={{
            overflowY: "hidden",
            overflowX: "hidden",
        }}>
            <Routes>

                <Route path={"/"} element={
                    <MountTabWrapper>
                        <ProjectsSelectionView/>
                    </MountTabWrapper>
                }/>

                <Route path={"/projects"} element={
                    <MountTabWrapper>
                        <ProjectsSelectionView/>
                    </MountTabWrapper>
                }/>

                <Route path={"/management"} element={
                    <MountTabWrapper>
                        <AppManagementView/>
                    </MountTabWrapper>
                }/>

                <Route path={"/assets"} element={
                    <MountTabWrapper>
                        <AssetsMainView/>
                    </MountTabWrapper>
                }/>

                <Route path={"/map-editor"} element={
                    <MountTabWrapper>
                        <MapEditorMainView/>
                    </MountTabWrapper>
                }/>

                <Route path={"/scene-editor"} element={
                    <MountTabWrapper>
                        <SceneEditorMainView/>
                    </MountTabWrapper>
                }/>

                <Route path={"/play"} element={
                    <MountTabWrapper>
                        <AssetsMainView/>
                    </MountTabWrapper>
                }/>


                <Route path={"/material-editor/:projectuid/:materialuid"} element={
                    <MaterialEditor/>
                }/>

            </Routes>
        </main>
    )
}


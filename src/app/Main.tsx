import React from "react";
import MainNavBar from "./MainNavBar";
import {ProSidebarProvider} from "react-pro-sidebar";

import {Route, Routes} from "react-router-dom";
import MountTabWrapper from "@components/MountTabWrapper";


const ProjectsSelectionView = React.lazy(() => import( "@components/projects/ProjectsSelectionView"))
const AssetsMainView = React.lazy(() => import("@components/assets/AssetsMainView"))
const AppManagementView = React.lazy(() => import("@editors/appmanagement/AppManagementView"))

const MapEditorMainView = React.lazy(() => import("@components/mapEditor/MapEditorMainView"))

const MeshEditor = React.lazy(() => import("@components/assets/mesh-editor/MeshEditor"))
const PointCloudEditor = React.lazy(() => import("@components/assets/pointcould-editor/PointCouldEditor"))
const PanoramaEditor = React.lazy(() => import( "@components/assets/panorama/PanoramaEditor"))
const SceneEditorDispatcher = React.lazy(() => import( "@components/assets/scene-editor/SceneEditorDispatcher"))


import MaterialEditor from "@components/assets/material/MaterialEditor";
import RoutesManager from "@platform/RoutesManager";


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

                <Route path={RoutesManager.ROUTE_PROJECTS} element={
                    <MountTabWrapper>
                        <ProjectsSelectionView/>
                    </MountTabWrapper>
                }/>

                <Route path={RoutesManager.ROUTE_MANAGEMENT} element={
                    <MountTabWrapper>
                        <AppManagementView/>
                    </MountTabWrapper>
                }/>

                <Route path={RoutesManager.ROUTE_ASSETS} element={
                    <MountTabWrapper>
                        <AssetsMainView/>
                    </MountTabWrapper>
                }/>

                <Route path={RoutesManager.ROUTE_AREA_EDITOR} element={
                    <MountTabWrapper>
                        <MapEditorMainView/>
                    </MountTabWrapper>
                }/>

                <Route path={RoutesManager.ROUTE_PLAY} element={
                    <MountTabWrapper>
                        <AssetsMainView/>
                    </MountTabWrapper>
                }/>


                <Route path={RoutesManager.ROUTE_MATERIAL_EDITOR} element={
                    <MaterialEditor/>
                }/>

                <Route path={RoutesManager.ROUTE_MESH_EDITOR} element={
                    <MeshEditor/>
                }/>

                <Route path={RoutesManager.ROUTE_POINTCLOUD_EDITOR} element={
                    <PointCloudEditor/>
                }/>

                <Route path={RoutesManager.ROUTE_PANORAMA_EDITOR} element={
                    <PanoramaEditor/>
                }/>

                <Route path={RoutesManager.ROUTE_SCENE_EDITOR} element={
                    <SceneEditorDispatcher/>
                }/>


            </Routes>
        </main>
    )
}


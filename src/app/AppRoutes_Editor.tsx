import React from "react";
import {Route, Routes} from "react-router-dom";
import MountTabWrapper from "@components/MountTabWrapper";
import {ViewContainer} from "@components/ViewContainer";
import RoutesManager from "@platform/RoutesManager";

const ProjectsSelectionView = React.lazy(() => import( "@components/projects/ProjectsSelectionView"))
const AssetsMainView = React.lazy(() => import("@components/assets/AssetsMainView"))
const AppManagementView = React.lazy(() => import("@editors/appmanagement/AppManagementView"))

const MeshEditor = React.lazy(() => import("@components/assets/mesh-editor/MeshEditor"))
const PointCloudEditor = React.lazy(() => import("@components/assets/pointcould-editor/PointCouldEditor"))
const PanoramaEditor = React.lazy(() => import( "@components/assets/panorama/PanoramaEditor"))
const AreaEditor = React.lazy(() => import("@components/assets/area-editor/AreaEditor"))
const MaterialEditor = React.lazy(() => import("@components/assets/material/MaterialEditor"))
const ExamEditorView = React.lazy(() => import("@components/assets/quiz-editor/ExamEditorView"))
const DataFactoryEditor = React.lazy(() => import("@components/assets/data-factory/DataFactoryEditor"))
const DataInstanceEditor = React.lazy(() => import("@components/assets/data-instance/DataInstanceEditor"))

const SceneEditorDispatcher = React.lazy(() => import("@components/assets/scene-editor/SceneEditorDispatcher"))

const VideoEditor = React.lazy(() => import("@components/assets/video/VideoEditor"))
const TrainingTaskSetEditorView = React.lazy(() => import("@components/assets/training-task-set/TrainingTaskSetEditorView"))
const ProjectConfigView = React.lazy(() => import("@components/projects/ProjectConfigView"))


export default function AppRoutes_Editor() {
    return (
        <main style={{
            overflowY: "hidden",
            overflowX: "hidden",
        }}>
            <Routes>

                <Route path={"/"} element={
                    <MountTabWrapper>
                        <ViewContainer>
                            <ProjectsSelectionView/>
                        </ViewContainer>
                    </MountTabWrapper>
                }/>

                <Route path={RoutesManager.ROUTE_PROJECTS} element={
                    <MountTabWrapper>
                        <ViewContainer>
                            <ProjectsSelectionView/>
                        </ViewContainer>
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

                <Route path={RoutesManager.ROUTE_PLAY} element={
                    <MountTabWrapper>
                        <AssetsMainView/>
                    </MountTabWrapper>
                }/>

                <Route path={RoutesManager.ROUTE_PROJECT_CONFIG} element={
                    <MountTabWrapper>
                        <ProjectConfigView/>
                    </MountTabWrapper>
                }/>


                <Route path={RoutesManager.ROUTE_MATERIAL_EDITOR} element={
                    <MountTabWrapper>
                        <MaterialEditor/>
                    </MountTabWrapper>

                }/>

                <Route path={RoutesManager.ROUTE_MESH_EDITOR} element={
                    <MountTabWrapper>
                        <MeshEditor/>
                    </MountTabWrapper>

                }/>

                <Route path={RoutesManager.ROUTE_POINTCLOUD_EDITOR} element={
                    <MountTabWrapper>
                        <PointCloudEditor/>
                    </MountTabWrapper>
                }/>

                <Route path={RoutesManager.ROUTE_PANORAMA_EDITOR} element={
                    <MountTabWrapper>
                        <PanoramaEditor/>
                    </MountTabWrapper>
                }/>

                <Route path={RoutesManager.ROUTE_SCENE_EDITOR} element={
                    <MountTabWrapper>
                        <SceneEditorDispatcher/>
                    </MountTabWrapper>
                }/>

                <Route path={RoutesManager.ROUTE_AREA_EDITOR} element={
                    <MountTabWrapper>
                        <AreaEditor/>
                    </MountTabWrapper>
                }/>

                <Route path={RoutesManager.ROUTE_QUIZ_EDITOR} element={
                    <MountTabWrapper>
                        <ExamEditorView/>
                    </MountTabWrapper>
                }/>

                <Route path={RoutesManager.ROUTE_TRAININGTASKSET_EDITOR} element={
                    <MountTabWrapper>
                        <TrainingTaskSetEditorView/>
                    </MountTabWrapper>
                }/>

                <Route path={RoutesManager.ROUTE_VIDEO_EDITOR} element={
                    <MountTabWrapper>
                        <VideoEditor/>
                    </MountTabWrapper>
                }/>
                <Route path={RoutesManager.ROUTE_DATAFACTORY_EDITOR} element={
                    <MountTabWrapper>
                        <DataFactoryEditor/>
                    </MountTabWrapper>
                }/>

                <Route path={RoutesManager.ROUTE_DATAINSTANCE_EDITOR} element={
                    <MountTabWrapper>
                        <DataInstanceEditor/>
                    </MountTabWrapper>
                }/>
            </Routes>
        </main>
    )
}
import React from "react";
import {Route, Routes} from "react-router-dom";
import MountTabWrapper from "@components/MountTabWrapper";
import {ViewContainer} from "@components/ViewContainer";
import RoutesManager from "@platform/RoutesManager";


const ProjectsSelectionView = React.lazy(() => import( "@components/projects/ProjectsSelectionView"))


//VTS
const VtsStatisticsView = React.lazy(() => import( "@players/vts/VtsStatisticsView"))
const VtsUsersView = React.lazy(() => import( "@players/vts/VtsUsersView"))
const VtsTrainingsView = React.lazy(() => import( "@players/vts/VtsTrainingsView"))
const VtsTrainingLevelsView = React.lazy(() => import("@players/vts/VtsTrainingLevelsView"))
const VtsLevelPlayerView = React.lazy(() => import( "@players/vts/VtsLevelPlayerView"))

const VtsTestScena = React.lazy(() => import(  "@players/vts/test-scena/VtsTestScena"))

export default function AppRoutes_Player() {

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

                <Route path={RoutesManager.ROUTE_TRAINING_STATISTICS} element={
                    <MountTabWrapper>
                        <VtsStatisticsView/>
                    </MountTabWrapper>
                }/>

                <Route path={RoutesManager.ROUTE_TRAINING_USERS} element={
                    <MountTabWrapper>
                        <VtsUsersView/>
                    </MountTabWrapper>
                }/>

                <Route path={RoutesManager.ROUTE_TRAININGS} element={
                    <MountTabWrapper>
                        <VtsTrainingsView/>
                    </MountTabWrapper>
                }/>

                <Route path={"/levels"} element={
                    <MountTabWrapper>
                        <VtsTrainingLevelsView/>
                    </MountTabWrapper>
                }/>

                <Route path={"/trainings-player-guis"} element={
                    <MountTabWrapper>
                        <VtsLevelPlayerView/>
                    </MountTabWrapper>
                }/>

                <Route path={"/play"} element={
                    <MountTabWrapper>
                        <VtsTestScena/>
                    </MountTabWrapper>
                }/>

            </Routes>


        </main>
    )

}

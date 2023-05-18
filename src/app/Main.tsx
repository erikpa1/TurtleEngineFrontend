import React from "react";
import MainNavBar from "./MainNavBar";
import {ProSidebarProvider} from "react-pro-sidebar";

import {Route, Routes} from "react-router-dom";


const ProjectsSelectionView = React.lazy(() => import( "@components/projects/ProjectsSelectionView"))
const AssetsMainView = React.lazy(() => import("@components/assets/AssetsMainView"))
const AppManagementView = React.lazy(() => import("@editors/appmanagement/AppManagementView"))


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
                <Route path={"/"} element={<_Test/>}/>
                <Route path={"/projects"} element={<ProjectsSelectionView/>}/>
                <Route path={"/management"} element={<AppManagementView/>}/>
                <Route path={"/assets"} element={<AssetsMainView/>}/>
                <Route path={"/mapeditor"} element={<AssetsMainView/>}/>
                <Route path={"/play"} element={<AssetsMainView/>}/>

            </Routes>
        </main>
    )
}

function _Test() {
    return (
        <div>
            Here
        </div>
    )
}
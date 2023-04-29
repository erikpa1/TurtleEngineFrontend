import AssetParent from "@platform/assets/AssetParent";
import LicenceManager from "@platform/licences/LicenceManager";
import {ProSidebarProvider} from "react-pro-sidebar";
import MainNavBar from "./MainNavBar";
import {Route, Routes} from "react-router-dom";
import AppManagementView from "@editors/appmanagement/AppManagementView";
import ProjectsSelectionView from "@components/projects/ProjectsSelectionView";

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
        <main>
            <Routes>
                <Route path={"/"} element={<_Test/>}/>
                <Route path={"/projects"} element={<ProjectsSelectionView/>}/>
                <Route path={"/management"} element={<AppManagementView/>}/>

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
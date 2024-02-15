import React from "react"
import MainNavBar from "./MainNavBar"
import {ProSidebarProvider} from "react-pro-sidebar"
import {Route, Routes} from "react-router-dom"
import RoutesApi from "@app/RoutesApi"


const ScenesView = React.lazy(() => import("@views/scene/ScenesView"))
const Scene3DView = React.lazy(() => import("@views/scene3d/Scene3DView"))


export default function AppRoutes() {

    ScenesView


    return (
        <div>
            <ProSidebarProvider>
                <MainNavBar/>
            </ProSidebarProvider>

            <div style={{flexGrow: 1}}>
                <Routes>
                    <Route path={"/"} element={<></>}/>

                    <Route path={RoutesApi.SCENES} element={
                        <React.Suspense>
                            <ScenesView/>
                        </React.Suspense>
                    }/>

                    <Route path={RoutesApi.SCENE} element={
                        <React.Suspense>
                            <Scene3DView/>
                        </React.Suspense>
                    }/>

                </Routes>

            </div>
        </div>
    )
}




import React from "react";
import MainNavBar from "./MainNavBar";
import {ProSidebarProvider} from "react-pro-sidebar";

import AppApi from "@api/AppApi";

import AppRoutes_Player from "@app/AppRoutes_Player";
import AppRoutes_Editor from "@app/AppRoutes_Editor";
import OpenXrDemoScene from "@openxr/OpenXrDemoScene";


export default function AppRoutes() {

    return (
        <div>
            <ProSidebarProvider>
                <MainNavBar/>
            </ProSidebarProvider>

            <div style={{flexGrow: 1}}>

                {/*<OpenXrDemoScene/>*/}
                {
                    AppApi.IsEditor() && <AppRoutes_Editor/>
                }
                {
                    AppApi.IsPlayer() && <AppRoutes_Player/>
                }

            </div>
        </div>
    )
}




import React from "react";
import MainNavBar from "./MainNavBar";
import {ProSidebarProvider} from "react-pro-sidebar";

import AppApi from "@api/AppApi";


export default function AppRoutes() {

    return (
        <div>
            <ProSidebarProvider>
                <MainNavBar/>
            </ProSidebarProvider>

            <div style={{flexGrow: 1}}>


            </div>
        </div>
    )
}




import React from 'react'

import './App.css'
import "./MuiOverride.css"
import AppRoutes from "@app/AppRoutes";
import GlobalAppLock from "./app/GlobalAppLock";
import {useGlobalPopup} from "@platform/zustands/globalPopupZus";

import PlatformDispatcher from "@api/PlatformDispatcher";
import {useNavigate} from "react-router-dom";

import ProjectApi from "@api/project/ProjectApi";
import FsTools from "@api/FsTools";
import {anyReceiver} from "@components/AnyEventEmmiter";
import Skin from "@data/skin";
import {Container, CssBaseline, Drawer, Typography} from "@mui/material";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {ProSidebarProvider} from "react-pro-sidebar";
import MainNavBar from '@app/MainNavBar';
import {DnDBox, DnDBox1, MultiplatformDngBox} from "@views/files/FilesView";

const darkTheme = createTheme({
    palette: {
        mode: 'light',
    },
})


export default function App() {

    const [isLoading, setIsLoading] = React.useState(true)

    const navigate = useNavigate()


    Skin.SetLight()


    async function refresh() {
        setIsLoading(true)
        if (PlatformDispatcher.IsDesktop()) {
            const project = await ProjectApi.GetActiveProject()
            if (project) {

                FsTools.WORK_DIR = project.project_folder

            } else {
                navigate("/")
            }
        }
        setIsLoading(false)
    }

    React.useEffect(() => {
        refresh()

        window.addEventListener('keydown', anyReceiver)

        return () => {
            window.removeEventListener('keydown', anyReceiver)
        }

    }, [])

    if (isLoading) {

        return (
            <div>Loading</div>
        )

    } else {

        return (
            <ThemeProvider theme={darkTheme}>

                <CssBaseline/>

                <div>
                    <div
                        className={"app_background"}
                        style={{
                            backgroundColor: Skin.ContainerB
                        }}
                    />

                    <div>
                        <ProSidebarProvider>
                            <MainNavBar/>
                        </ProSidebarProvider>

                        <div style={{flexGrow: 1}}>
                            <AppRoutes/>
                        </div>
                    </div>

                    <GlobalAppLock/>
                    <_GlobalPopup/>
                </div>
            </ThemeProvider>

        )
    }

}


function _GlobalPopup() {

    const popupZus = useGlobalPopup()

    if (popupZus.elements.length > 0) {
        return (
            <>
                {popupZus.elements.map((value, index) => {
                    return <React.Fragment key={index}>{value}</React.Fragment>
                })}
            </>
        )
    } else {
        return (<></>)
    }

}



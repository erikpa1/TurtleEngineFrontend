import React from 'react'

import './App.css'
import "./MuiOverride.css"
import AppRoutes from "@app/AppRoutes";
import GlobalAppLock from "./app/GlobalAppLock";
import {useGlobalPopup} from "@platform/zustands/globalPopupZus";

import PlatformDispatcher from "@api/PlatformDispatcher";
import {useNavigate} from "react-router-dom";
import WasmView from "./WasmEntry";
import ProjectApi from "@api/project/ProjectApi";
import FsTools from "@api/FsTools";


export default function App() {


    const [isLoading, setIsLoading] = React.useState(true)

    const navigate = useNavigate()

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
    }, [])

    if (isLoading) {

        return (
            <div>Loading</div>
        )

    } else {

        return (
            <div>
                <div className={"app_background"}/>
                <GlobalAppLock/>
                <_LoggedContent/>
                <_GlobalPopup/>
            </div>

        )
    }

}

function _LoggedContent() {
    return (
        <AppRoutes/>
    )
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



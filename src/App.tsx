import React from 'react'

import './App.css'
import AppRoutes from "@app/AppRoutes";
import GlobalAppLock from "./app/GlobalAppLock";
import {useGlobalPopup} from "@platform/zustands/globalPopupZus";
import AppApi from "@api/AppApi";
import PlatformDispatcher from "@api/PlatformDispatcher";
import {useNavigate} from "react-router-dom";
import WasmView from "./WasmEntry";
import LoginView from "./routes/auth/LoginView";
import {useActiveUser} from "@hooks/activeUserZus";


export default function App() {

    return (
        <div>
            <div className={"app_background"}/>
            <GlobalAppLock/>
            <_App1/>
            <_GlobalPopup/>
        </div>
    )
}

function _App1() {
    const activeUserZus = useActiveUser()

    const [isLoading, setIsLoading] = React.useState(true)

    const navigate = useNavigate()

    React.useEffect(() => {
        setIsLoading(true)

        AppApi.Init().then(() => {
            setIsLoading(false)

            if (PlatformDispatcher.IsDesktop()) {
                navigate("/")
            }
        })

    }, [])

    if (isLoading) {

        return (
            <div>Loading</div>
        )

    } else {
        if (activeUserZus.user) {
            return (
                <_LoggedContent/>
            )
        } else {
            return (
                <LoginView/>
            )
        }

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



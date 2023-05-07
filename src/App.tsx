import React, {useState} from 'react'

import './App.css'
import Main from "./app/Main";
import GlobalAppLock from "./app/GlobalAppLock";
import {useGlobalPopup} from "@platform/zustands/globalPopupZus";

export default function App() {

    return (
        <div>
            <div className={"app_background"}/>

            <GlobalAppLock/>

            <_LoggedContent/>

            <_GlobalPopup/>
        </div>

    )
}

function _LoggedContent() {
    return (
        <Main/>
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

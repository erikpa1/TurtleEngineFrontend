import React from "react";
import {Ext} from "@external/prelude";


export default function ProjectPlayerConfig({}) {


    const [tabValue, setTabValue] = Ext.Cookie.useCookie("project-config-tab-main", "0")

    const tabChanged = (e: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue)
    }

    return (
        <>
            Initial scene:


        </>

    )
}


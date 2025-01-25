import React from "react";


import GraphicSettings from "@Turtle/Data/graphicssettings"
import {useGraphicsSettings} from "@Turtle/GraphicsSettings/graphicsSeetingsZus"

export default function EditGraphicsSettingsView({}) {

    const {data, setData} = useGraphicsSettings()

    function resetData() {
        setData(data)
    }

    return (
        <div className={"vstack gap-3"}>

        </div>
    )
}
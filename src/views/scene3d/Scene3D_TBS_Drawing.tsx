import React from "react";
import Stack from "@mui/material/Stack";
import TopBarButton from "@components/TopBarButton";
import {useSceneModules} from "@views/scene3d/scene_modules";
import DrawingFiber from "@views/scene3d/drawing/DrawingFiber";


export default function Scene3D_TBS_Drawing({}) {

    return (
        <Stack direction={"row"}>
            <_DrawingModule/>
        </Stack>
    )
}


const MODULE = "drawing"

function _DrawingModule() {


    const modulesZus = useSceneModules()

    const _active = modulesZus.modules.has(MODULE)

    function _onClick() {
        if (_active) {
            modulesZus.removeModule(MODULE)
        } else {
            modulesZus.addModule(MODULE, <DrawingFiber/>)
        }

    }

    return (
        <>
            <TopBarButton
                isActive={_active}
                icon={"/icons/Drawing.Add.svg"}
                lang={"drawing.add"}
                onClick={_onClick}
            />

            <TopBarButton
                icon={"/icons/Drawing.Add.svg"}
                lang={"drawing.clear.layer"}
            />
        </>
    )
}


import React from "react";
import Stack from "@mui/material/Stack";
import TopBarButton from "@components/TopBarButton";
import {useSceneModules} from "@views/scene3d/scene_modules";
import DrawingFiber from "@views/scene3d/drawing/DrawingFiber";
import Icons from "@icons/Icons";


export default function Scene3D_TBS_Drawing({}) {

    return (
        <Stack direction={"row"}>
            <_DrawingModule/>

            <TopBarButton
                icon={Icons.PhysicsBox}
                lang={"solid-box"}
            />
            <TopBarButton
                icon={Icons.PhysicsBox}
                lang={"wireframe-box"}
            />

            <TopBarButton
                icon={Icons.PhysicsSphere}
                lang={"solid-sphere"}
            />
            <TopBarButton
                icon={Icons.PhysicsSphere}
                lang={"wireframe-sphere"}
            />

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


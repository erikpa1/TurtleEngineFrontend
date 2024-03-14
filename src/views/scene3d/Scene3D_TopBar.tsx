import React from "react"
import {useTranslation} from "react-i18next"

import Scene3D_TBS_Edit from "@views/scene3d/Scene3D_TBS_Edit"
import Scene3D_TBS_Zones from "@views/scene3d/Scene3D_TBS_Zones"
import Scene3D_TBS_AttPoints from "@views/scene3d/Scene3D_TBS_AttPoints"
import Scene3D_TBS_Drawing from "@views/scene3d/Scene3D_TBS_Drawing"
import Scene3D_TBS_Meshes from "@views/scene3d/meshes/Scene3D_TBS_Meshes"
import Scene3D_TBS_Boards from "@views/scene3d/boards/Scene3D_TBS_Boards"

import Scene3D_TBS_Physics from "@views/scene3d/physics/Scene3D_TBS_Physics"

import {DockingTab} from "@components/docking/docking"

export function useSceneViewTopBar(): Array<DockingTab> {

    const [t] = useTranslation()

    return [
        {
            title: t("edit"),
            id: "edit",
            content: (
                <div className={"hstack gap-1"}>
                    <Scene3D_TBS_Edit/>
                </div>
            ),

        },
        {
            title: t("meshes"),
            id: "meshes",
            content: (
                <div className={"hstack gap-1"}>
                    <Scene3D_TBS_Meshes/>
                </div>
            ),

        },
        {
            title: t("drawing"),
            id: "drawing",
            content: (
                <div className={"hstack gap-1"}>
                    <Scene3D_TBS_Drawing/>
                </div>
            ),
        },
        {
            title: t("attpoints"),
            id: "attpoints",
            content: (
                <div className={"hstack gap-1"}>
                    <Scene3D_TBS_AttPoints/>
                </div>
            ),
        },
        {
            title: t("physics"),
            id: "physics",
            content: (
                <div className={"hstack gap-1"}>
                    <Scene3D_TBS_Physics/>
                </div>
            ),
        },
        {
            title: t("logiccircuit"),
            id: "logiccircuit",
            content: (
                <div className={"hstack gap-1"}>

                </div>
            ),
        },
        {
            title: t("boards"),
            id: "boards",
            content: (
                <div className={"hstack gap-1"}>
                    <Scene3D_TBS_Boards/>
                </div>
            ),
        },
        {
            title: t("plantdesign"),
            id: "plantdesign",
            content: (
                <div className={"hstack gap-1"}>
                </div>
            ),
        },


    ]
}
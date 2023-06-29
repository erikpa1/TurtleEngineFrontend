import React from "react";
import HudButton from "@components/assets/HudButton.tsx";
import {useActiveNodeZus} from "@components/assets/scene-editor/scene-zuses.ts";
import {GizmoTypes} from "@components/assets/canvases/SceneTransformHelper.tsx";


const GIZMO_ICONS = {}
GIZMO_ICONS[GizmoTypes.TRANSLATE] = "/icons/Gizmo.Translate.svg"
GIZMO_ICONS[GizmoTypes.ROTATE] = "/icons/Gizmo.Rotate.svg"
GIZMO_ICONS[GizmoTypes.SCALE] = "/icons/Gizmo.Scale.svg"

export default function HudGizmoSwapper({}) {

    GizmoTypes.TRANSLATE

    const activeNode = useActiveNodeZus()

    function clicked() {

        const gizmo = activeNode.gizmoType

        if (gizmo === GizmoTypes.TRANSLATE) {
            activeNode.setGizmoType(GizmoTypes.SCALE)
        } else if (gizmo === GizmoTypes.SCALE) {
            activeNode.setGizmoType(GizmoTypes.ROTATE)
        } else {
            activeNode.setGizmoType(GizmoTypes.TRANSLATE)
        }

    }


    return (
        <HudButton
            lang={activeNode.gizmoType}
            icon={GIZMO_ICONS[activeNode.gizmoType]}
            onClick={clicked}
        />
    )
}
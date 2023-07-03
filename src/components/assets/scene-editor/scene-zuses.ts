import {SceneNode} from "@platform/scene/SceneNode";
import create from "zustand";
import {GizmoTypes} from "@components/assets/canvases/SceneTransformHelper";


interface ActiveNodeZus {
    activeNode: SceneNode | null
    setActiveNode: (newNode: null | SceneNode) => void
    gizmoType: string,
    setGizmoType: (newGizmo: string) => void
}

export const useActiveNodeZus = create<ActiveNodeZus>((set) => ({
    activeNode: null,
    setActiveNode: (newNode) => set((newState) => ({
            activeNode: newNode
        }
    )),
    gizmoType: GizmoTypes.TRANSLATE,
    setGizmoType: (newGizmo: string) => set((newState) => ({
            gizmoType: newGizmo
        }
    ))
}))
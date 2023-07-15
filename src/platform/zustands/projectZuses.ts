import create from "zustand"

import {ProjectLight} from "@data/project/ProjectLight";

interface ActiveProjectZus {
    project: ProjectLight | any
    setProject: (project: ProjectLight) => void
}

export const useActiveProjectZus = create<ActiveProjectZus>((set) => ({
    project: null,
    setProject: (project: ProjectLight) => set((oldState) => ({
        project: project
    })),

}))


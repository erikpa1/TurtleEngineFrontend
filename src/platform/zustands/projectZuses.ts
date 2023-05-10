import create from "zustand"

import {ProjectLight} from "@data/project/ProjectLight";

interface ActiveProjectZus {
    project: ProjectLight
    setProject: (project: ProjectLight) => void
}

export const useActiveProjectZus = create<ActiveProjectZus>((set) => ({
    project: false,
    setProject: (project: ProjectLight) => set((oldState) => ({
        project: project
    })),

}))


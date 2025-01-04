import create from "zustand"

import {Project} from "@data/project/Project";

interface ActiveProjectZus {
    project: Project | any
    setProject: (project: Project) => void
}

export const useActiveProjectZus = create<ActiveProjectZus>((set) => ({
    project: null,
    setProject: (project: Project) => set((oldState) => ({
        project: project
    })),

}))


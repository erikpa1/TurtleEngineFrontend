import create from "zustand";


interface SceneModules {
    modules: Map<string, any>

    addModule: (key: string, module: any) => void
    removeModule: (key: string) => void


}

export const useSceneModules = create<SceneModules>((set) => ({
    modules: new Map<string, any>,

    addModule: (key, module) => set((newState) => {
        newState.modules.set(key, module)
        return {modules: newState.modules}
    }),

    removeModule: (key: string) => set((newState) => {
        newState.modules.delete(key)
        return {modules: newState.modules}
    }),


}))
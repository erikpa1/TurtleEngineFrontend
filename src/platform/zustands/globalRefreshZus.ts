import create from "zustand";

interface GlobalRefreshRequest {
    onRefresh: any
    setRefreshListener: (fn: any) => void
    clear: () => void
}

export const useGlobalRefresh = create<GlobalRefreshRequest>((set) => ({
    onRefresh: () => {/**/
    },
    setRefreshListener: (fn: any) => set((oldState) => ({
        onRefresh: fn
    })),
    clear: () => set((oldState) => ({
        onRefresh: () => {/**/
        }
    })),

}))
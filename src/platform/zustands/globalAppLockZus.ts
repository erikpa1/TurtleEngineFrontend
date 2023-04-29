import create from "zustand"

interface GlobalAppLockState {
    isAppLocked: boolean
    isFailed: boolean
    lock: () => void
    unlock: () => void
    fail: () => void
}

export const useGlobalAppLock = create<GlobalAppLockState>((set) => ({
    isAppLocked: false,
    isFailed: false,
    lock: () => set((newState) => ({isAppLocked: true})),
    fail: () => set((newState) => ({isFailed: true})),
    unlock: () => set((newState) => ({isAppLocked: false}))

}))


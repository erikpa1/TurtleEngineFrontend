import create from "zustand"

interface GlobalPopupZus {
    elements: any | HTMLElement
    setElement: (element: HTMLElement | any) => void
    clear: () => void
    popElement: () => void
    pushElement: (lement: HTMLElement | any) => void

}

export const useGlobalPopup = create<GlobalPopupZus>((set) => ({
    elements: [],

    setElement: (element: any) => set((newState) => {
        return {elements: [element]}
    }),

    pushElement: (element: any) => set((oldState) => ({
        elements: [...oldState.elements, element]
    })),

    clear: () => set((newState) => ({elements: []})),

    popElement: () => set((oldState) => {
        oldState.elements.pop()
        return {elements: oldState.elements}
    })

}))


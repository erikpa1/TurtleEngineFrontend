import {create} from "zustand";
import GraphicSettings from "@Turtle/Data/graphicssettings";


interface GraphicsSettingsZus {
    data: GraphicSettings
    setData: (newView: GraphicSettings) => void
}


export const useGraphicsSettings = create<GraphicsSettingsZus>((set) => ({
    data: new GraphicSettings(),
    setData: (newData: GraphicSettings) => set((newState) => ({data: newData.Duplicate()}))

}))
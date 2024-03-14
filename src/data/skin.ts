const VW_LIGHT = 'radial-gradient(#9fadc2, #d4dff1)'
const VW_DARK = 'radial-gradient(#212121, #252525)'

export default class Skin {

    static ContainerA = "#101418"
    // static ContainerB = "#424242"
    static ContainerB = "#0d1925"

    static FontActive = "white"
    static FontInactive = "lightgray"
    static WorldView = VW_DARK

    static SetDark() {
        Skin.ContainerA = "#101418"
        Skin.ContainerB = "#0d1925"
        Skin.FontActive = "white"
        Skin.FontInactive = "lightgray"
        Skin.WorldView = VW_DARK
    }

    static SetLight() {
        Skin.ContainerA = "#f3f5f8"
        Skin.ContainerB = "#f4f5f7"
        Skin.FontActive = "black"
        Skin.FontInactive = "lightgray"
        Skin.WorldView = VW_LIGHT
    }

}


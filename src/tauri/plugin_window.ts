import {appWindow} from "@tauri-apps/api/window";


export default class TauriWindowPlugin {
    static async ChangeWindowTitle(newTitle) {
        appWindow.setTitle(`Turtle Engine - ${newTitle}`)
    }
}
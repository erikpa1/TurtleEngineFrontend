export default class ApiDispatcher {


    static IsDesktop(): any {
        return (window as any).__TAURI_IPC__
    }

    static IsWeb() {
        return !ApiDispatcher.IsDesktop()
    }


}
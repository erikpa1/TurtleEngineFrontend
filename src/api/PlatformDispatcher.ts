import {open} from '@tauri-apps/api/dialog';

export default class PlatformDispatcher {


    static IsDesktop(): any {
        return (window as any).__TAURI_IPC__
    }

    static IsWeb() {
        return !PlatformDispatcher.IsDesktop()
    }

    static async OpenImageDialog(): Promise<string> {
        const selected = await open({
            multiple: false,
            filters: [{
                name: 'Image',
                extensions: ['png', 'jpeg', "jpg"]
            }]
        });

        if (selected) {
            return selected as string
        } else {
            return ""
        }
    }


    static async OpenSingleMeshDialog(extension: string): Promise<string> {
        const selected = await open({
            multiple: false,
            filters: [{
                name: 'Mesh',
                extensions: [extension]
            }]
        });


        if (selected) {
            return selected as string
        } else {
            return ""
        }
    }


}
import {open} from '@tauri-apps/api/dialog';

export default class PlatformDispatcher {

    static IsMozila(): boolean {

        return navigator.userAgent.toLowerCase().includes('firefox') || Boolean((navigator as any).brave)
    }


    static IsDesktop(): any {
        return (window as any).__TAURI_INTERNALS__ != undefined
    }

    static IsMobile(): boolean {
        const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera

        // Check for Android
        const isAndroidMobile = /Android/i.test(userAgent) && /Mobile/i.test(userAgent);
        const isAndroidTablet = /Android/i.test(userAgent) && !/Mobile/i.test(userAgent);

        // Check for iOS
        const isIOSMobile = /iPhone|iPod/i.test(userAgent);
        const isIOSTablet = /iPad/i.test(userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); // iPads with iOS 13+ are detected as 'MacIntel'


        return Boolean(isAndroidMobile || isAndroidTablet || isIOSMobile || isIOSTablet)
    }

    static IsAndroidTauri(): boolean {
        const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
        const isAndroid = /Android/i.test(userAgent);
        const isTauri = (window as any)?.__TAURI_INTERNALS__;
        return isAndroid && isTauri;
    }

    static IsMobileTauri(): boolean {
        const isTauri = (window as any)?.__TAURI_INTERNALS__;
        return (PlatformDispatcher.IsMobile() && isTauri) || (PlatformDispatcher.IsDesktop()  && isTauri)
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

    static async OpenAnySingleFileDialog(title: string, extension: string): Promise<string> {
        const selected = await open({
            multiple: false,
            filters: [{
                name: title,
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
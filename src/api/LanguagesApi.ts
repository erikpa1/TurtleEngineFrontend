import PlatformDispatcher from "@api/PlatformDispatcher";
import TauriOsPlugin from "../tauri/plugin_os";
import FsTools from "@api/FsTools";

export default class LanguagesApi {


    static ACTIVE_LANGUAGE = "en"

    static LANGS = new Map<string, string>()

    static async Activate(projectUid: string, language: string) {

        if (PlatformDispatcher.IsDesktop()) {
            const data = TauriOsPlugin.ReadFileStringSafe(FsTools.GetPathInProject(projectUid, `Translations/${language}.json`), "[]")

            const newMap = new Map<string, string>()

        }
    }


    static async LoadAll(): Promise<Map<string, Map<string, string | null>>> {
        return new Map()
    }


    static T(key: string): string {

        if (key.search("$") === 0) {
            const storage = LanguagesApi.LANGS.get(LanguagesApi.ACTIVE_LANGUAGE)
            return key
        }


        return key
    }

    static async SaveSplit(projectUid: string, mutation: string, data: Array<[string, string]>) {
        if (PlatformDispatcher.IsDesktop()) {
            //pass
        }
    }

    static FromJson(jobj: Array<any>) {

        for (const i of jobj) {

            const tmp = new Map<string, string | null>()


        }


    }

}
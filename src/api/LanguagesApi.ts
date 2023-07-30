import PlatformDispatcher from "@api/PlatformDispatcher";
import TauriOsPlugin from "../tauri/plugin_os";
import FsTools from "@api/FsTools";

export default class LanguagesApi {


    static ACTIVE_LANGUAGE = "en"

    static LANGS = new Map<string, Map<string, string>>()

    static async Activate(projectUid: string, language: string) {

        if (PlatformDispatcher.IsDesktop()) {
            const data = TauriOsPlugin.ReadFileStringSafe(FsTools.GetPathInProject(projectUid, `Translations/${language}.json`), "[]")

            const newMap = new Map<string, string>()

        }
    }


    static async GetProjectLanguages(): Promise<Set<string>> {
        return new Set(["en", "sk", "cz"])
    }

    static async GetAll(projectUid: string, languages: Set<string>): Promise<Map<string, Map<string, string | null>>> {

        if (PlatformDispatcher.IsDesktop()) {

            const promises = Array.from(languages.values()).map((value) => {
                return TauriOsPlugin.ReadFileStringSafe(FsTools.GetPathInProject(projectUid, `Languages/${value}.json`), "{}")
            })

            const value = await Promise.all(promises)

            return new Map()

        } else {
            alert("Get all languages is unimplemnted")
        }

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
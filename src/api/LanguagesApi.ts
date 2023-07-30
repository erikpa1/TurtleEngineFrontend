import PlatformDispatcher from "@api/PlatformDispatcher";
import TauriOsPlugin from "../tauri/plugin_os";
import FsTools from "@api/FsTools";


export type LangsMap = Map<string, Map<string, string | null>>
export default class LanguagesApi {


    static ACTIVE_LANGUAGE = "en"

    static LANGS = new Map<string, Map<string, string>>()

    static async Activate(projectUid: string, language: string) {

        if (PlatformDispatcher.IsDesktop()) {
            const data = TauriOsPlugin.ReadFileStringSafe(FsTools.GetPathInProject(projectUid, `Translations/${language}.json`), "[]")

            const newMap = new Map<string, string>()

        }
    }


    static async GetProjectLanguages(project: string): Promise<Set<string>> {
        return new Set(["en", "sk", "cz"])
    }

    static async GetAll(projectUid: string, languages: Set<string>): Promise<LangsMap> {

        if (PlatformDispatcher.IsDesktop()) {

            const langs = Array.from(languages.values())

            const promises = langs.map((value) => {
                return TauriOsPlugin.ReadFileStringSafe(FsTools.GetPathInProject(projectUid, `Languages/${value}.json`), "[]")
            })

            const value = await Promise.all(promises)

            const tmpMap = new Map<string, Map<string, string | null>>()

            let index = 0

            for (const i of langs) {

                const serialized: Array<[string, string]> = JSON.parse(value[index]) as any

                for (const row of serialized) {
                    let language = tmpMap.get(row[0])

                    if (!language) {
                        language = new Map<string, string | null>()
                        tmpMap.set(row[0], language)
                    }
                    language.set(i, row[1])
                }
                index += 1
            }

            return tmpMap

        } else {
            alert("Get all languages is unimplemented for web")
        }

        return new Map()
    }

    static async SaveAll(projectUid: string, mutations: Set<string>, languages: LangsMap) {

        const langs = Array.from(mutations.values())

        const promises = langs.map((mutation) => {

            const result: Array<[string, string]> = []

            for (const i of languages.entries()) {

                const value = i[1].get(mutation)

                if (value && value !== "") {
                    result.push([i[0], value])
                }
            }

            return TauriOsPlugin.WriteFileString(FsTools.GetPathInProject(projectUid,
                    `Languages/${mutation}.json`),
                JSON.stringify(result))
        })

        await Promise.all(promises)
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
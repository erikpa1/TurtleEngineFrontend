export default class LanguagesManager {


    static ACTIVE_LANGUAGE = "en"
    static ACTIVE_FALLBACK = "en"
    static LANGS = new Map<string, Map<string, string>>()


    static async Init() {
        //pass

    }

    static T(key: string): string {

        if (key.search("$") === 0) {
            let storage = LanguagesManager.LANGS.get(LanguagesManager.ACTIVE_LANGUAGE)

            if (!storage) {
                storage = LanguagesManager.LANGS.get(LanguagesManager.ACTIVE_FALLBACK)
            }

            if (storage) {
                const lang = storage.get(key)

                if (lang) {
                    return lang
                } else {
                    storage = LanguagesManager.LANGS.get(LanguagesManager.ACTIVE_FALLBACK)

                    if (storage) {
                        const lang = storage.get(key)

                        if (lang) {
                            return lang
                        }
                    }
                }
            }
        }
        return key
    }


}
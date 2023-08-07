export class LibraryEntity {
    icon = ""
    name = ""
    type = ""
    group = ""
    clazz: any = null
}

export default class SceneEntitiesFactory {

    static CLASSES_MAP = new Map<string, any>()
    static FIBER_HANDLERS_MAP = new Map<string, any>()
    static EDITORS_CONTENT_MAP = new Map<string, any>()

    static LIBRARY = new Map<string, Array<LibraryEntity>>()

    static GetClass(nodeType: string): any {
        const tmp = SceneEntitiesFactory.CLASSES_MAP.get(nodeType)

        if (tmp) {
            return tmp
        } else {
            return SceneEntitiesFactory.CLASSES_MAP.get("base")
        }

    }

    static GetFiberHandler(nodeType: string): any {
        const tmp = SceneEntitiesFactory.FIBER_HANDLERS_MAP.get(nodeType)

        console.log(`Getting: ${nodeType}`)

        if (tmp) {
            console.log(`Returning: ${tmp}`)
            return tmp
        } else {
            return SceneEntitiesFactory.FIBER_HANDLERS_MAP.get("base")
        }

    }

    static GetEditorContent(nodeType: string): any {
        const tmp = SceneEntitiesFactory.EDITORS_CONTENT_MAP.get(nodeType)

        if (tmp) {
            return tmp
        } else {
            return SceneEntitiesFactory.EDITORS_CONTENT_MAP.get("base")
        }
    }

    static AddClass(nodeType: string, clazz) {
        SceneEntitiesFactory.CLASSES_MAP.set(nodeType, clazz)
    }

    static AddEditorContent(nodeType: string, clazz) {
        SceneEntitiesFactory.EDITORS_CONTENT_MAP.set(nodeType, clazz)
    }

    static AddFiberClass(nodeType: string, clazz) {
        SceneEntitiesFactory.FIBER_HANDLERS_MAP.set(nodeType, clazz)
    }

    static AddLibraryEntity(entity: LibraryEntity) {
        let groupArray = SceneEntitiesFactory.LIBRARY.get(entity.group)

        if (!groupArray) {
            const tmp = new Array<LibraryEntity>()
            groupArray = tmp
            SceneEntitiesFactory.LIBRARY.set(entity.group, tmp)
        }

        groupArray.push(entity)
    }


}
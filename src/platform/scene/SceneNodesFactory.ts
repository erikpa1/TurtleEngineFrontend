export default class SceneNodesFactory {

    static CLASSES_MAP = new Map<string, any>()
    static FIBER_HANDLERS_MAP = new Map<string, any>()
    static EDITORS_CONTENT_MAP = new Map<string, any>()

    static GetClass(nodeType: string): any {
        const tmp = SceneNodesFactory.CLASSES_MAP.get(nodeType)

        if (tmp) {
            return tmp
        } else {
            return SceneNodesFactory.CLASSES_MAP.get("base")
        }

    }

    static GetFiberHandler(nodeType: string): any {
        const tmp = SceneNodesFactory.FIBER_HANDLERS_MAP.get(nodeType)

        if (tmp) {
            return tmp
        } else {
            return SceneNodesFactory.FIBER_HANDLERS_MAP.get("base")
        }

    }

    static GetEditorContent(nodeType: string): any {
        const tmp = SceneNodesFactory.EDITORS_CONTENT_MAP.get(nodeType)

        if (tmp) {
            return tmp
        } else {
            return SceneNodesFactory.EDITORS_CONTENT_MAP.get("base")
        }

    }

    static AddClass(nodeType: string, clazz) {
        SceneNodesFactory.CLASSES_MAP.set(nodeType, clazz)
    }

    static AddEditorContent(nodeType: string, clazz) {
        SceneNodesFactory.EDITORS_CONTENT_MAP.set(nodeType, clazz)
    }


    static AddFiberClass(nodeType: string, clazz) {
        SceneNodesFactory.FIBER_HANDLERS_MAP.set(nodeType, clazz)
    }
}
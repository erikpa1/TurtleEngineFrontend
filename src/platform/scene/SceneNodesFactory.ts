import {SceneNode} from "@platform/scene/SceneNode";


export default class SceneNodesFactory {

    static CLASSES_MAP = new Map<string, any>()

    static GetClass(nodeType: string): any {
        const tmp = SceneNodesFactory.CLASSES_MAP.get(nodeType)

        if (tmp) {
            return tmp
        } else {
            return SceneNodesFactory.CLASSES_MAP.get("base")
        }

    }

    static AddClass(nodeType: string, clazz) {
        SceneNodesFactory.CLASSES_MAP.set(nodeType, clazz)
    }

}
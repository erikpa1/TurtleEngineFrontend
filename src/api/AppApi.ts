import PlatformDispatcher from "@api/PlatformDispatcher";
import FsTools from "@api/FsTools";

import TauriProjectPlugin from "../tauri/plugin_project";
import TauriOsPlugin from "../tauri/plugin_os";
import ConstantsApi from "@api/ConstantsApi";
import SceneEntitiesFactory, {LibraryEntity} from "@platform/entities/SceneEntitiesFactory";
import {SceneEntity, EntityView} from "@platform/entities/SceneEntity";
import {SceneMeshNode, SceneMeshNodeView} from "@platform/entities/world/SceneMeshNode";
import {VideoEntity, SceneVideoNodeView} from "@platform/entities/media/VideoEntity";
import VideoSceneNodeContentEditor from "@components/assets/scene-editor/scene-nodes/VideoSceneNodeOffcanvasContent";
import DefaultSceneEditorContent from "@components/assets/scene-editor/scene-nodes/DefaultSceneEditorContent";
import {PhysicalAvatarEntity, PhysicsAvatarEntityView} from "@platform/entities/physics/PhysicsAvatarEntity";
import {PhysicalSphereEntity, PhysicalSphereEntityView} from "@platform/entities/physics/PhysicsSphereEntity";
import {PhysicalCylinderEntity, PhysicsCapsuleEntityView} from "@platform/entities/physics/PhysicalCylinderEntity";
import {PhysicalBoxEntity, PhysicsBoxEntityView} from "@platform/entities/physics/PhysicsBoxEntity";
import {PhysicalPlaneEntity, PhysicsPlaneEntityView} from "@platform/entities/physics/PhysicsPlaneEntity";


export default class AppApi {


    static MODE = "player"

    static IsPlayer() {
        return AppApi.MODE === "player"
    }

    static IsEditor() {
        return AppApi.MODE === "editor"
    }

    static async Init() {

        if (PlatformDispatcher.IsDesktop()) {
            FsTools.WORK_DIR = await TauriOsPlugin.GetWorkingDirectory()
            await TauriProjectPlugin.ActivateLastProject()
        }
        await ConstantsApi.Init()
        await AppApi.RegisterFactory()

        if (AppApi.IsEditor()) {
            await AppApi.RegisterLibrary()
        }
    }


    static async RegisterFactory() {

        //Scene Node
        SceneEntitiesFactory.AddClass(SceneEntity.TYPE, SceneEntity)
        SceneEntitiesFactory.AddFiberClass(SceneEntity.TYPE, EntityView)
        SceneEntitiesFactory.AddEditorContent(SceneEntity.TYPE, DefaultSceneEditorContent)
        //Scene Mesh node
        SceneEntitiesFactory.AddClass(SceneMeshNode.TYPE, SceneMeshNode)
        SceneEntitiesFactory.AddFiberClass(SceneMeshNode.TYPE, SceneMeshNodeView)

        //Scene video node
        SceneEntitiesFactory.AddClass(VideoEntity.TYPE, VideoEntity)
        SceneEntitiesFactory.AddFiberClass(VideoEntity.TYPE, SceneVideoNodeView)
        SceneEntitiesFactory.AddEditorContent(VideoEntity.TYPE, VideoSceneNodeContentEditor)

    }

    static async RegisterLibrary() {
        await _RegisterPhysicsLibrary()

    }

}


async function _RegisterPhysicsLibrary() {

    console.log("Called")

    function _reg(lang: string, icon: string, clazz: typeof SceneEntity, entityClazz: any) {
        const tmp = new LibraryEntity()
        tmp.group = "physics"
        tmp.name = lang
        tmp.type = clazz.TYPE
        tmp.clazz = clazz
        tmp.icon = icon
        SceneEntitiesFactory.AddClass(tmp.type, clazz)
        SceneEntitiesFactory.AddLibraryEntity(tmp)
        SceneEntitiesFactory.AddFiberClass(tmp.type, entityClazz)
    }

    _reg("avatar", "/icons/Physics.Avatar.svg", PhysicalAvatarEntity, PhysicsAvatarEntityView)
    _reg("box", "/icons/Physics.Box.svg", PhysicalBoxEntity, PhysicsBoxEntityView)
    _reg("sphere", "/icons/Physics.Sphere.svg", PhysicalSphereEntity, PhysicalSphereEntityView)
    _reg("plane", "/icons/Physics.Plane.svg", PhysicalPlaneEntity, PhysicsPlaneEntityView)
    _reg("cylinder", "/icons/Physics.Capsule.svg", PhysicalCylinderEntity, PhysicsCapsuleEntityView)
}
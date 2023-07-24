import PlatformDispatcher from "@api/PlatformDispatcher";
import FsTools from "@api/FsTools";

import TauriProjectPlugin from "../tauri/plugin_project";
import TauriOsPlugin from "../tauri/plugin_os";
import ConstantsApi from "@api/ConstantsApi";
import SceneNodesFactory from "@platform/scene/SceneNodesFactory";
import {SceneNode, SceneNodeView} from "@platform/scene/SceneNode";
import {SceneMeshNode, SceneMeshNodeView} from "@platform/scene/world/SceneMeshNode";
import {SceneVideoNode, SceneVideoNodeView} from "@platform/scene/media/SceneVideoNode";
import VideoSceneNodeContentEditor from "@components/assets/scene-editor/scene-nodes/VideoSceneNodeOffcanvasContent";
import DefaultSceneEditorContent from "@components/assets/scene-editor/scene-nodes/DefaultSceneEditorContent";
import App from "../App";


export default class AppApi {


    static MODE = "editor"

    static IsPlayer() {
        return AppApi.MODE === "player-guis"
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
    }


    static async RegisterFactory() {

        //Scene Node
        SceneNodesFactory.AddClass(SceneNode.TYPE, SceneNode)
        SceneNodesFactory.AddFiberClass(SceneNode.TYPE, SceneNodeView)
        SceneNodesFactory.AddEditorContent(SceneNode.TYPE, DefaultSceneEditorContent)

        //Scene Mesh node
        SceneNodesFactory.AddClass(SceneMeshNode.TYPE, SceneMeshNode)
        SceneNodesFactory.AddFiberClass(SceneMeshNode.TYPE, SceneMeshNodeView)

        //Scene video node
        SceneNodesFactory.AddClass(SceneVideoNode.TYPE, SceneVideoNode)
        SceneNodesFactory.AddFiberClass(SceneVideoNode.TYPE, SceneVideoNodeView)
        SceneNodesFactory.AddEditorContent(SceneVideoNode.TYPE, VideoSceneNodeContentEditor)


    }

}
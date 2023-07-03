import PlatformDispatcher from "@api/PlatformDispatcher";
import FsTools from "@api/FsTools";
import {resourceDir} from "@tauri-apps/api/path";

import TauriProjectPlugin from "../tauri/plugin_project";
import TauriOsPlugin from "../tauri/plugin_os";
import ConstantsApi from "@api/ConstantsApi";
import SceneNodesFactory from "@platform/scene/SceneNodesFactory";
import {SceneNode} from "@platform/scene/SceneNode";
import {Scene} from "three";
import {SceneMeshNode} from "@platform/scene/world/SceneMeshNode";
import {SceneVideoNode} from "@platform/scene/media/SceneVideoNode";


export default class AppApi {


    static async Init() {

        if (PlatformDispatcher.IsDesktop()) {
            FsTools.WORK_DIR = await TauriOsPlugin.GetWorkingDirectory()

            await TauriProjectPlugin.ActivateLastProject()

        }

        await ConstantsApi.Init()
        await AppApi.RegisterFactory()
    }


    static async RegisterFactory() {

        SceneNodesFactory.AddClass(SceneNode.TYPE, SceneNode)
        SceneNodesFactory.AddClass(SceneMeshNode.TYPE, SceneMeshNode)
        SceneNodesFactory.AddClass(SceneVideoNode.TYPE, SceneVideoNode)


    }

}
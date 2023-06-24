import FsTools from "@api/FsTools";

export default class ConstantsApi {

    static DEFAULT_MESH_PATH = ""
    static DEFAULT_POINT_CLOUD_PATH = ""

    static async Init() {
        ConstantsApi.DEFAULT_MESH_PATH = FsTools.GetPlatformPath("Meshes/Default.glb")


    }

}
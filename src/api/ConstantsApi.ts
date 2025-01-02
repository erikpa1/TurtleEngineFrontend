import FsTools from "@api/FsTools";

export default class ConstantsApi {

    static COLOR_MAIN = "#13b0de"
    static COLOR_SECONDARY = "#13b0de"


    static DEFAULT_MESH_PATH = ""
    static DEFAULT_POINT_CLOUD_PATH = ""

    static async Init() {
        ConstantsApi.DEFAULT_MESH_PATH = FsTools.GetPlatformPath("Meshes/Default.glb")


    }

}
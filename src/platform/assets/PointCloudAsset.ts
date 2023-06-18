import AssetParent from "./AssetParent";

export default class PointCloudAsset extends AssetParent {
    static TYPE = "pointcloud"
    static FOLDER = "PointClouds"
    static LANG = "core.pointcloud"
    static LANG_PLURAL = "core.pointclouds"
    static DEFAULT_PLATFORM_FILE = `Images/Previews/${PointCloudAsset.TYPE}-Preview.png`
}

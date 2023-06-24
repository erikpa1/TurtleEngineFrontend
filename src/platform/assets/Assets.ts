import MaterialAsset from "@platform/assets/MaterialAsset";
import MeshAsset from "@platform/assets/MeshAsset";
import PointCloudAsset from "@platform/assets/PointCloudAsset";
import VideoAsset from "@platform/assets/VideoAsset";
import ImageAsset from "@platform/assets/ImageAsset";
import QuizAsset from "@platform/assets/QuizAsset";
import PanoramaAsset from "@platform/assets/PanoramaAsset";
import AreaAsset from "@platform/assets/AreaAsset";
import SceneAsset from "@platform/assets/SceneAsset";
import SoundAsset from "@platform/assets/SoundAsset";
import FontAsset from "@platform/assets/FontAsset";


export class AssetDefinition {

    FOLDER = ""
    TYPE = ""
    LANG = ""
    LANG_PLURAL = ""

    DEFAULT_PLATFORM_FILE = ""
    CLASS: any

    constructor(_clazz: any) {
        this.FOLDER = _clazz.FOLDER
        this.TYPE = _clazz.TYPE
        this.LANG = _clazz.LANG
        this.LANG_PLURAL = _clazz.LANG_PLURAL
        this.DEFAULT_PLATFORM_FILE = _clazz.DEFAULT_PLATFORM_FILE
        this.CLASS = _clazz


    }
}


export const Assets = {
    Material: new AssetDefinition(MaterialAsset),
    Mesh: new AssetDefinition(MeshAsset),
    PointCloud: new AssetDefinition(PointCloudAsset),
    Panorama: new AssetDefinition(PanoramaAsset),
    Video: new AssetDefinition(VideoAsset),
    Image: new AssetDefinition(ImageAsset),
    Quiz: new AssetDefinition(QuizAsset),
    Area: new AssetDefinition(AreaAsset),
    Scene: new AssetDefinition(SceneAsset),
    Sound: new AssetDefinition(SoundAsset),
    Font: new AssetDefinition(FontAsset),

    values: () => {
        return [
            Assets.Scene,
            Assets.Mesh,
            Assets.Video,
            Assets.Panorama,
            Assets.Material,
            Assets.PointCloud,
            Assets.Image,
            Assets.Quiz,
            Assets.Area,
            Assets.Sound,
            Assets.Font,

        ]
    }


}

export const AssetsTypeMap = new Map<string, any>(Assets.values().map((value) => {
    return [value.TYPE, value]
}))



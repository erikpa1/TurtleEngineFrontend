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
import DataFactoryAsset from "@platform/assets/DataFactoryAsset.ts";
import DataInstanceAsset from "@platform/assets/DataInstanceAsset.ts";


export class AssetDefinition {

    FOLDER = ""
    TYPE = ""
    LANG = ""
    LANG_PLURAL = ""

    DEFAULT_PLATFORM_FILE = ""
    CLASS: any
    SUBTYPES = new Array<[string, string]>()


    constructor(_clazz: any) {
        this.FOLDER = _clazz.FOLDER
        this.TYPE = _clazz.TYPE
        this.LANG = _clazz.LANG
        this.LANG_PLURAL = _clazz.LANG_PLURAL
        this.DEFAULT_PLATFORM_FILE = _clazz.DEFAULT_PLATFORM_FILE
        this.CLASS = _clazz

        if (_clazz.SUBTYPES) {
            this.SUBTYPES = _clazz.SUBTYPES
        }

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
    DataFactory: new AssetDefinition(DataFactoryAsset),
    DataInstance: new AssetDefinition(DataInstanceAsset),
    Label: new AssetDefinition(DataInstanceAsset),

    dataAssets: () => {
        return [
            Assets.DataFactory,
            Assets.DataInstance,
            Assets.Quiz,
            Assets.Label,
        ]
    },

    mediaAssets: () => {
        return [
            Assets.Image,
            Assets.Video,
            Assets.Sound,

        ]
    },


    worldAssets: () => {
        return [
            Assets.Scene,
            Assets.Panorama,
            Assets.Material,
            Assets.PointCloud,
            Assets.Mesh,
            Assets.Area,

            Assets.Font,

        ]
    },

    all: () => {
        return [
            ...Assets.dataAssets(),
            ...Assets.mediaAssets(),
            ...Assets.worldAssets()
        ]
    },


}

export const AssetsTypeMap = new Map<string, any>(Assets.all().map((value) => {
    return [value.TYPE, value]
}))



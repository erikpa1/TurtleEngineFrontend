import {AssetData} from "@platform/assets/Asset";
import MaterialData from "@platform/assets/material";
import {MeshAssetData} from "@platform/assets/mesh";
import PointCloudData from "@platform/assets/pointcloud";
import PanoramaAssetData from "@platform/assets/panorama";
import VideoData from "@platform/assets/video";
import ImageData from "@platform/assets/image";
import ExamAssetData from "@platform/assets/exam";
import AreaAssetData from "@platform/assets/area";
import SoundData from "@platform/assets/sound";
import FontData from "@platform/assets/font";
import DataFactoryData from "@platform/assets/datafactory";
import DataInstanceData from "@platform/assets/datainstance";
import TrainingTaskSetData from "@platform/assets/trainingTaskSetData";
import VirtualSceneDefinition from "@platform/assets/scenes/VirtualSceneDefinition";
import PanoramaSceneDefinition from "@platform/assets/scenes/PanoramaSceneDefinition";
import SceneDefinition from "@platform/assets/scenes/SceneDefinition";

export class AssetSubtype {
    key = ""
    lang = ""
}

export class AssetDefinition {

    TYPE = ""
    LANG = ""
    LANG_PLURAL = ""
    ICON = ""

    DEFAULT_PREVIEW = ""
    DEFAULT_FILES = new Array<[string, string]>()
    SUBTYPES_CONSTRUCTORS: any | null = {}
    DEFAULT_DATA: () => AssetData = () => {
        return new AssetData()
    }

    SUBTYPES = new Array<AssetSubtype>()
}

function _getPreview(type: string): string {
    return `Images/Previews/${type}-Preview.png`
}


const MATERIAL = new AssetDefinition()
MATERIAL.ICON = "Create.Material.svg"
MATERIAL.TYPE = "material"
MATERIAL.LANG = "material"
MATERIAL.LANG_PLURAL = "materials"
MATERIAL.DEFAULT_PREVIEW = _getPreview(MATERIAL.TYPE)
MATERIAL.DEFAULT_DATA = () => new MaterialData()
MATERIAL.SUBTYPES_CONSTRUCTORS = {"": MaterialData}

const MESH = new AssetDefinition()
MESH.TYPE = "mesh"
MESH.ICON = "Create.Mesh.svg"
MESH.LANG = "mesh"
MESH.LANG_PLURAL = "meshes"
MESH.DEFAULT_PREVIEW = _getPreview(MESH.TYPE)
MESH.SUBTYPES_CONSTRUCTORS = {"": MeshAssetData}
MESH.DEFAULT_DATA = () => {
    const tmp = new MeshAssetData()
    tmp.mesh_extension = "glb"
    return tmp
}
MESH.DEFAULT_FILES = [
    ["Defaults/Assets/default-mesh.glb", "Default.glb"]
]

const POINTCLOUD = new AssetDefinition()
POINTCLOUD.TYPE = "pointcloud"
POINTCLOUD.ICON = "Create.Pointcloud.svg"
POINTCLOUD.LANG = "pointcloud"
POINTCLOUD.LANG_PLURAL = "pointclouds"
POINTCLOUD.DEFAULT_PREVIEW = _getPreview(POINTCLOUD.TYPE)
POINTCLOUD.DEFAULT_DATA = () => new PointCloudData()
POINTCLOUD.SUBTYPES_CONSTRUCTORS = {"": PointCloudData}

const PANORAMA = new AssetDefinition()
PANORAMA.TYPE = "panorama"
PANORAMA.ICON = "Scene.svg"
PANORAMA.LANG = "panorama"
PANORAMA.LANG_PLURAL = "panoramas"
PANORAMA.DEFAULT_PREVIEW = _getPreview(PANORAMA.TYPE)
PANORAMA.SUBTYPES_CONSTRUCTORS = {"": PanoramaAssetData}
PANORAMA.DEFAULT_DATA = () => {
    const tmp = new PanoramaAssetData()
    tmp.extension = "jpg"
    return tmp
}
PANORAMA.DEFAULT_FILES = [
    ["Defaults/Assets/default-panorama.jpg", "Default.jpg"]
]

const VIDEO = new AssetDefinition()
VIDEO.TYPE = "video"
VIDEO.ICON = "Create.Video.svg"
VIDEO.LANG = "video"
VIDEO.LANG_PLURAL = "videos"
VIDEO.DEFAULT_PREVIEW = _getPreview(VIDEO.TYPE)
VIDEO.DEFAULT_DATA = () => new VideoData()
VIDEO.SUBTYPES_CONSTRUCTORS = {"": VideoData}

VIDEO.DEFAULT_DATA = () => {
    const tmp = new VideoData()
    tmp.video_extension = "mp4"
    return tmp
}
VIDEO.DEFAULT_FILES = [
    ["Defaults/Assets/default-video.mp4", "Default.mp4"]
]

const IMAGE = new AssetDefinition()
IMAGE.TYPE = "image"
IMAGE.ICON = "Create.Image.svg"
IMAGE.LANG = "image"
IMAGE.LANG_PLURAL = "images"
IMAGE.DEFAULT_PREVIEW = _getPreview(IMAGE.TYPE)
IMAGE.DEFAULT_DATA = () => new ImageData()
IMAGE.SUBTYPES_CONSTRUCTORS = {"": ImageData}

const EXAM = new AssetDefinition()
EXAM.TYPE = "exam"
EXAM.ICON = "Create.Exam.svg"
EXAM.LANG = "exam"
EXAM.LANG_PLURAL = "exams"
EXAM.DEFAULT_PREVIEW = _getPreview(EXAM.TYPE)
EXAM.DEFAULT_DATA = () => new ExamAssetData()
EXAM.SUBTYPES_CONSTRUCTORS = {"": ExamAssetData}

const AREA = new AssetDefinition()
AREA.TYPE = "area"
AREA.ICON = "Create.Area.svg"
AREA.LANG = "area"
AREA.LANG_PLURAL = "areas"
AREA.DEFAULT_PREVIEW = _getPreview(AREA.TYPE)
AREA.DEFAULT_DATA = () => new AreaAssetData()
AREA.SUBTYPES_CONSTRUCTORS = {"": AreaAssetData}

const SCENE = new AssetDefinition()
SCENE.TYPE = "scene"
SCENE.ICON = "Scene.svg"
SCENE.LANG = "scene"
SCENE.LANG_PLURAL = "scenes"
SCENE.DEFAULT_PREVIEW = _getPreview(SCENE.TYPE)


const SCENE_PANORAMA_SUBTYPE = new AssetSubtype()
SCENE_PANORAMA_SUBTYPE.key = "virtual"
SCENE_PANORAMA_SUBTYPE.lang = "entities.virtual"

const SCENE_VIRTUAL_SUBTYPE = new AssetSubtype()
SCENE_VIRTUAL_SUBTYPE.key = "panorama"
SCENE_VIRTUAL_SUBTYPE.lang = "entities.panorama"

const SCENE_AREA_SUBTYPE = new AssetSubtype()
SCENE_AREA_SUBTYPE.key = "area"
SCENE_AREA_SUBTYPE.lang = "entities.area"

SCENE.SUBTYPES = [
    SCENE_PANORAMA_SUBTYPE,
    SCENE_VIRTUAL_SUBTYPE,
    SCENE_AREA_SUBTYPE,
]

SCENE.SUBTYPES_CONSTRUCTORS = {
    "virtual": VirtualSceneDefinition,
    "panorama": PanoramaSceneDefinition,
    "area": SceneDefinition,

}

const SOUND = new AssetDefinition()
SOUND.TYPE = "sound"
SOUND.ICON = "Create.Sound.svg"
SOUND.LANG = "sound"
SOUND.LANG_PLURAL = "sounds"
SOUND.DEFAULT_PREVIEW = _getPreview(SOUND.TYPE)
SOUND.DEFAULT_DATA = () => new SoundData()
SOUND.SUBTYPES_CONSTRUCTORS = {"": SoundData}

const FONT = new AssetDefinition()
FONT.TYPE = "font"
FONT.ICON = "Create.Font.svg"
FONT.LANG = "font"
FONT.LANG_PLURAL = "fonts"
FONT.DEFAULT_PREVIEW = _getPreview(FONT.TYPE)
FONT.DEFAULT_DATA = () => new FontData()
FONT.SUBTYPES_CONSTRUCTORS = {"": FontData}

const DATAFACTORY = new AssetDefinition()
DATAFACTORY.TYPE = "datafactory"
DATAFACTORY.LANG = "datafactory"
DATAFACTORY.LANG_PLURAL = "datafactories"
DATAFACTORY.DEFAULT_PREVIEW = _getPreview(DATAFACTORY.TYPE)
DATAFACTORY.DEFAULT_DATA = () => new DataFactoryData()
DATAFACTORY.SUBTYPES_CONSTRUCTORS = {"": DataFactoryData}

const DATAINSTANCE = new AssetDefinition()
DATAINSTANCE.TYPE = "datainstance"
DATAINSTANCE.LANG = "datainstance"
DATAINSTANCE.LANG_PLURAL = "datainstances"
DATAINSTANCE.DEFAULT_PREVIEW = _getPreview(DATAINSTANCE.TYPE)
DATAINSTANCE.DEFAULT_DATA = () => new DataInstanceData()
DATAINSTANCE.SUBTYPES_CONSTRUCTORS = {"": DataInstanceData}


const DATASET = new AssetDefinition()
DATASET.TYPE = "dataset"
DATASET.LANG = "dataset"
DATASET.LANG_PLURAL = "datasets"
DATASET.DEFAULT_PREVIEW = _getPreview(DATASET.TYPE)
//TODO datase definition


const DOCUMENT = new AssetDefinition()
DOCUMENT.TYPE = "document"
DOCUMENT.LANG = "document"
DOCUMENT.LANG_PLURAL = "documents"
DOCUMENT.DEFAULT_PREVIEW = _getPreview(DOCUMENT.TYPE)
//TODO document definition

const LABEl = new AssetDefinition()
LABEl.TYPE = "label"
LABEl.LANG = "label"
LABEl.LANG_PLURAL = "labels"
LABEl.DEFAULT_PREVIEW = _getPreview(LABEl.TYPE)

const TRAININGTASKSET = new AssetDefinition()
TRAININGTASKSET.TYPE = "trainingtaskset"
TRAININGTASKSET.LANG = "trainingtaskset"
TRAININGTASKSET.LANG_PLURAL = "trainingtasksets"
TRAININGTASKSET.DEFAULT_PREVIEW = _getPreview(TRAININGTASKSET.TYPE)
TRAININGTASKSET.DEFAULT_DATA = () => new TrainingTaskSetData()
TRAININGTASKSET.SUBTYPES_CONSTRUCTORS = {"": TrainingTaskSetData}

const Assets = {
    Material: MATERIAL,
    Mesh: MESH,
    PointCloud: POINTCLOUD,
    Panorama: PANORAMA,
    Video: VIDEO,
    Image: IMAGE,
    Exam: EXAM,
    Area: AREA,
    Scene: SCENE,
    Sound: SOUND,
    Font: FONT,
    DataFactory: DATAFACTORY,
    DataInstance: DATAINSTANCE,
    Label: LABEl,
    Document: DOCUMENT,
    DataSet: DATASET,
    TrainingTaskSet: TRAININGTASKSET,

    dataAssets: () => {
        return [
            Assets.Exam,
            Assets.Label,
            Assets.DataFactory,
            Assets.DataInstance,
            Assets.DataSet,
        ]
    },

    vtsAssets: () => {
        return [
            Assets.TrainingTaskSet,
        ]
    },

    mediaAssets: () => {
        return [
            Assets.Image,
            Assets.Video,
            Assets.Sound,
            Assets.Document,

        ]
    },


    worldAssets: () => {
        return [
            Assets.Scene,
            Assets.Mesh,
            Assets.Panorama,
            Assets.Material,
            Assets.Area,
            Assets.PointCloud,
            Assets.Font,
        ]
    },

    all: () => {
        return [
            ...Assets.dataAssets(),
            ...Assets.mediaAssets(),
            ...Assets.worldAssets(),
            ...Assets.vtsAssets()
        ]
    },


}

export default Assets

export const AssetsTypeMap = new Map<string, any>(Assets.all().map((value) => {
    return [value.TYPE, value]
}))



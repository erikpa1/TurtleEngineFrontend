import {AssetData} from "@platform/assets/Asset";
import MaterialData from "@platform/assets/material";
import {MeshAssetData} from "@platform/assets/mesh";
import PointCloudData from "@platform/assets/pointcloud";
import PanoramaData from "@platform/assets/panorama";
import VideoData from "@platform/assets/video";
import ImageData from "@platform/assets/image";
import QuizData from "@platform/assets/quiz";
import AreaData from "@platform/assets/area";
import SoundData from "@platform/assets/sound";
import FontData from "@platform/assets/font";
import DataFactoryData from "@platform/assets/datafactory";
import DataInstanceData from "@platform/assets/datainstance";

export class AssetSubtype {
    key = ""
    lang = ""
}

export class AssetDefinition {

    TYPE = ""
    LANG = ""
    LANG_PLURAL = ""

    DEFAULT_PREVIEW = ""
    DEFAULT_FILES = new Array<[string, string]>()
    DEFAULT_DATA: () => AssetData = () => {
        return new AssetData()
    }
    SUBTYPES = new Array<AssetSubtype>()
}

function _getPreview(type: string): string {
    return `Images/Previews/${type}-Preview.png`
}


const MATERIAL = new AssetDefinition()
MATERIAL.TYPE = "material"
MATERIAL.LANG = "material"
MATERIAL.LANG_PLURAL = "materials"
MATERIAL.DEFAULT_PREVIEW = _getPreview(MATERIAL.TYPE)
MATERIAL.DEFAULT_DATA = () => new MaterialData()

const MESH = new AssetDefinition()
MESH.TYPE = "mesh"
MESH.LANG = "mesh"
MESH.LANG_PLURAL = "meshes"
MESH.DEFAULT_PREVIEW = _getPreview(MESH.TYPE)
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
POINTCLOUD.LANG = "pointcloud"
POINTCLOUD.LANG_PLURAL = "pointclouds"
POINTCLOUD.DEFAULT_PREVIEW = _getPreview(POINTCLOUD.TYPE)
POINTCLOUD.DEFAULT_DATA = () => new PointCloudData()


const PANORAMA = new AssetDefinition()
PANORAMA.TYPE = "panorama"
PANORAMA.LANG = "panorama"
PANORAMA.LANG_PLURAL = "panoramas"
PANORAMA.DEFAULT_PREVIEW = _getPreview(PANORAMA.TYPE)
PANORAMA.DEFAULT_DATA = () => {
    const tmp = new PanoramaData()
    tmp.extension = "jpg"
    return tmp
}
MESH.DEFAULT_FILES = [
    ["Defaults/Assets/default-panorama.jpg", "Default.jpg"]
]

const VIDEO = new AssetDefinition()
VIDEO.TYPE = "video"
VIDEO.LANG = "video"
VIDEO.LANG_PLURAL = "videos"
VIDEO.DEFAULT_PREVIEW = _getPreview(VIDEO.TYPE)
VIDEO.DEFAULT_DATA = () => new VideoData()

const IMAGE = new AssetDefinition()
IMAGE.TYPE = "image"
IMAGE.LANG = "image"
IMAGE.LANG_PLURAL = "images"
IMAGE.DEFAULT_PREVIEW = _getPreview(IMAGE.TYPE)
IMAGE.DEFAULT_DATA = () => new ImageData()

const QUIZ = new AssetDefinition()
QUIZ.TYPE = "quiz"
QUIZ.LANG = "quiz"
QUIZ.LANG_PLURAL = "quizzes"
QUIZ.DEFAULT_PREVIEW = _getPreview(QUIZ.TYPE)
QUIZ.DEFAULT_DATA = () => new QuizData()

const AREA = new AssetDefinition()
AREA.TYPE = "area"
AREA.LANG = "area"
AREA.LANG_PLURAL = "areas"
AREA.DEFAULT_PREVIEW = _getPreview(AREA.TYPE)
AREA.DEFAULT_DATA = () => new AreaData()

const SCENE = new AssetDefinition()
SCENE.TYPE = "scene"
SCENE.LANG = "scene"
SCENE.LANG_PLURAL = "scenes"
SCENE.DEFAULT_PREVIEW = _getPreview(SCENE.TYPE)

const SCENE_PANORAMA_SUBTYPE = new AssetSubtype()
SCENE_PANORAMA_SUBTYPE.key = "virtual"
SCENE_PANORAMA_SUBTYPE.lang = "scene.virtual"

const SCENE_VIRTUAL_SUBTYPE = new AssetSubtype()
SCENE_VIRTUAL_SUBTYPE.key = "panorama"
SCENE_VIRTUAL_SUBTYPE.lang = "scene.panorama"

const SCENE_AREA_SUBTYPE = new AssetSubtype()
SCENE_AREA_SUBTYPE.key = "area"
SCENE_AREA_SUBTYPE.lang = "scene.area"

SCENE.SUBTYPES = [
    SCENE_PANORAMA_SUBTYPE,
    SCENE_VIRTUAL_SUBTYPE,
    SCENE_AREA_SUBTYPE,
]

const SOUND = new AssetDefinition()
SOUND.TYPE = "sound"
SOUND.LANG = "sound"
SOUND.LANG_PLURAL = "sounds"
SOUND.DEFAULT_PREVIEW = _getPreview(SOUND.TYPE)
SOUND.DEFAULT_DATA = () => new SoundData()

const FONT = new AssetDefinition()
FONT.TYPE = "font"
FONT.LANG = "font"
FONT.LANG_PLURAL = "fonts"
FONT.DEFAULT_PREVIEW = _getPreview(FONT.TYPE)
FONT.DEFAULT_DATA = () => new FontData()

const DATAFACTORY = new AssetDefinition()
DATAFACTORY.TYPE = "datafactory"
DATAFACTORY.LANG = "datafactory"
DATAFACTORY.LANG_PLURAL = "datafactories"
DATAFACTORY.DEFAULT_PREVIEW = _getPreview(DATAFACTORY.TYPE)
DATAFACTORY.DEFAULT_DATA = () => new DataFactoryData()

const DATAINSTANCE = new AssetDefinition()
DATAINSTANCE.TYPE = "datainstance"
DATAINSTANCE.LANG = "datainstance"
DATAINSTANCE.LANG_PLURAL = "datainstances"
DATAINSTANCE.DEFAULT_PREVIEW = _getPreview(DATAINSTANCE.TYPE)
DATAINSTANCE.DEFAULT_DATA = () => new DataInstanceData()


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


const Assets = {
    Material: MATERIAL,
    Mesh: MESH,
    PointCloud: POINTCLOUD,
    Panorama: PANORAMA,
    Video: VIDEO,
    Image: IMAGE,
    Quiz: QUIZ,
    Area: AREA,
    Scene: SCENE,
    Sound: SOUND,
    Font: FONT,
    DataFactory: DATAFACTORY,
    DataInstance: DATAINSTANCE,
    Label: LABEl,
    Document: DOCUMENT,
    DataSet: DATASET,

    dataAssets: () => {
        return [
            Assets.DataFactory,
            Assets.DataInstance,
            Assets.DataSet,
            Assets.Quiz,
            Assets.Label,
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
            ...Assets.worldAssets()
        ]
    },


}

export default Assets

export const AssetsTypeMap = new Map<string, any>(Assets.all().map((value) => {
    return [value.TYPE, value]
}))



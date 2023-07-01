export class AssetSubtype {
    key = ""
    lang = ""
}

export class AssetDefinition {

    TYPE = ""
    LANG = ""
    LANG_PLURAL = ""

    DEFAULT_PREVIEW = ""
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

const MESH = new AssetDefinition()
MESH.TYPE = "mesh"
MESH.LANG = "mesh"
MESH.LANG_PLURAL = "meshes"
MESH.DEFAULT_PREVIEW = _getPreview(MESH.TYPE)


const POINTCLOUD = new AssetDefinition()
POINTCLOUD.TYPE = "pointcloud"
POINTCLOUD.LANG = "pointcloud"
POINTCLOUD.LANG_PLURAL = "pointclouds"
POINTCLOUD.DEFAULT_PREVIEW = _getPreview(POINTCLOUD.TYPE)

const PANORAMA = new AssetDefinition()
PANORAMA.TYPE = "panorama"
PANORAMA.LANG = "panorama"
PANORAMA.LANG_PLURAL = "panoramas"
PANORAMA.DEFAULT_PREVIEW = _getPreview(PANORAMA.TYPE)

const VIDEO = new AssetDefinition()
VIDEO.TYPE = "video"
VIDEO.LANG = "video"
VIDEO.LANG_PLURAL = "videos"
VIDEO.DEFAULT_PREVIEW = _getPreview(VIDEO.TYPE)

const IMAGE = new AssetDefinition()
IMAGE.TYPE = "image"
IMAGE.LANG = "image"
IMAGE.LANG_PLURAL = "images"
IMAGE.DEFAULT_PREVIEW = _getPreview(IMAGE.TYPE)

const QUIZ = new AssetDefinition()
QUIZ.TYPE = "quiz"
QUIZ.LANG = "quiz"
QUIZ.LANG_PLURAL = "quizzes"
QUIZ.DEFAULT_PREVIEW = _getPreview(QUIZ.TYPE)

const AREA = new AssetDefinition()
AREA.TYPE = "area"
AREA.LANG = "area"
AREA.LANG_PLURAL = "areas"
AREA.DEFAULT_PREVIEW = _getPreview(AREA.TYPE)

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

const FONT = new AssetDefinition()
FONT.TYPE = "font"
FONT.LANG = "font"
FONT.LANG_PLURAL = "fonts"
FONT.DEFAULT_PREVIEW = _getPreview(FONT.TYPE)

const DATAFACTORY = new AssetDefinition()
DATAFACTORY.TYPE = "datafactory"
DATAFACTORY.LANG = "datafactory"
DATAFACTORY.LANG_PLURAL = "datafactories"
DATAFACTORY.DEFAULT_PREVIEW = _getPreview(DATAFACTORY.TYPE)

const DATAINSTANCE = new AssetDefinition()
DATAINSTANCE.TYPE = "datainstance"
DATAINSTANCE.LANG = "datainstance"
DATAINSTANCE.LANG_PLURAL = "datainstances"
DATAINSTANCE.DEFAULT_PREVIEW = _getPreview(DATAINSTANCE.TYPE)

const DATASET = new AssetDefinition()
DATASET.TYPE = "dataset"
DATASET.LANG = "dataset"
DATASET.LANG_PLURAL = "datasets"
DATASET.DEFAULT_PREVIEW = _getPreview(DATASET.TYPE)


const DOCUMENT = new AssetDefinition()
DOCUMENT.TYPE = "document"
DOCUMENT.LANG = "document"
DOCUMENT.LANG_PLURAL = "documents"
DOCUMENT.DEFAULT_PREVIEW = _getPreview(DOCUMENT.TYPE)


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

export default Assets

export const AssetsTypeMap = new Map<string, any>(Assets.all().map((value) => {
    return [value.TYPE, value]
}))



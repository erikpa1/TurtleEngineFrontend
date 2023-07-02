import Assets from "@platform/assets/Assets";

const PREFIX_PROJECT_CONFIG = "/project-config"
const PREFIX_ASSETS = "/assets"
const PREFIX_PLAY = "/play"
const PREFIX_SCENE_EDITOR = "/scene-editor"
const PREFIX_MESH_EDITOR = "/mesh-editor"
const PREFIX_AREA_EDITOR = "/area-editor"
const PREFIX_MATERIAL_EDITOR = "/material-editor"
const PREFIX_POINTCLOUD_EDITOR = "/point-cloud-editor"
const PREFIX_PANORAMA_EDITOR = "/panorama-editor"
const PREFIX_QUIZ_EDITOR = "/quiz-editor"
const PREFIX_DATAFACTORY_EDITOR = "/data-factory-editor"
const PREFIX_DATAINSTANCE_EDITOR = "/data-instance-editor"

export default class RoutesManager {

    static ROUTE_PROJECTS = `/projects`
    static ROUTE_MANAGEMENT = `/management`
    static ROUTE_ASSETS = `${PREFIX_ASSETS}/:projectuid`
    static ROUTE_PROJECT_CONFIG = `${PREFIX_PROJECT_CONFIG}/:projectuid`
    static ROUTE_PLAY = `${PREFIX_PLAY}/:projectuid`
    static ROUTE_SCENE_EDITOR = `${PREFIX_SCENE_EDITOR}/:projectuid/:sceneuid`
    static ROUTE_AREA_EDITOR = `${PREFIX_AREA_EDITOR}/:projectuid/:areauid`
    static ROUTE_MATERIAL_EDITOR = `${PREFIX_MATERIAL_EDITOR}/:projectuid/:materialuid`
    static ROUTE_MESH_EDITOR = `${PREFIX_MESH_EDITOR}/:projectuid/:meshuid`
    static ROUTE_POINTCLOUD_EDITOR = `${PREFIX_POINTCLOUD_EDITOR}/:projectuid/:clouduid`
    static ROUTE_PANORAMA_EDITOR = `${PREFIX_PANORAMA_EDITOR}/:projectuid/:panoramauid`
    static ROUTE_QUIZ_EDITOR = `${PREFIX_QUIZ_EDITOR}/:projectuid/:quiz`
    static ROUTE_DATAFACTORY_EDITOR = `${PREFIX_DATAFACTORY_EDITOR}/:projectuid/:datafactory`
    static ROUTE_DATAINSTANCE_EDITOR = `${PREFIX_DATAINSTANCE_EDITOR}/:projectuid/:datainstance`

    static Assets(projectUid: string): string {
        return `${PREFIX_ASSETS}/${projectUid}`
    }

    static ProjectConfig(projectUid: string): string {
        return `${PREFIX_PROJECT_CONFIG}/${projectUid}`
    }

    static AreaEditor(projectUid: string, areaUid: string): string {
        return `${PREFIX_AREA_EDITOR}/${projectUid}/${areaUid}`
    }

    static MeshEditor(projectUid: string, meshUid: string): string {
        return `${PREFIX_MESH_EDITOR}/${projectUid}/${meshUid}`
    }

    static SceneEditor(projectUid: string, sceneUid: string): string {
        return `${PREFIX_SCENE_EDITOR}/${projectUid}/${sceneUid}`
    }

    static MaterialEditor(projectUid: string, materialUid: string): string {
        return `${PREFIX_MATERIAL_EDITOR}/${projectUid}/${materialUid}`
    }

    static PointCloudEditor(projectUid: string, cloudUid: string): string {
        return `${PREFIX_POINTCLOUD_EDITOR}/${projectUid}/${cloudUid}`
    }

    static DataFactoryEditor(projectUid: string, dataFactroy: string): string {
        return `${PREFIX_DATAFACTORY_EDITOR}/${projectUid}/${dataFactroy}`
    }

    static DataInstanceEditor(projectUid: string, dataInstance: string): string {
        return `${PREFIX_DATAINSTANCE_EDITOR}/${projectUid}/${dataInstance}`
    }

    static PanoramaEditor(projectUid: string, panoramaUid: string): string {
        return `${PREFIX_PANORAMA_EDITOR}/${projectUid}/${panoramaUid}`
    }

    static QuizEditor(projectUid: string, quizUid: string): string {
        return `${PREFIX_QUIZ_EDITOR}/${projectUid}/${quizUid}`
    }

    static Play(projectUid: string): string {
        return `${PREFIX_PLAY}/${projectUid}`
    }

    static GetAssetRoute(projectUid: string, assetType: string, assetUid: string) {
        if (ASSET_ROUTES_MAP.has(assetType)) {
            return ASSET_ROUTES_MAP.get(assetType)(projectUid, assetUid)
        } else {
            alert(`No editor for: ${assetType}`)
            return "/"
        }
    }

}

const ASSET_ROUTES_MAP = new Map<string, any>([
    [Assets.Area.TYPE, RoutesManager.AreaEditor],
    [Assets.Quiz.TYPE, RoutesManager.QuizEditor],
    [Assets.Mesh.TYPE, RoutesManager.MeshEditor],
    [Assets.Material.TYPE, RoutesManager.MaterialEditor],
    [Assets.Panorama.TYPE, RoutesManager.PanoramaEditor],
    [Assets.Scene.TYPE, RoutesManager.SceneEditor],
    [Assets.PointCloud.TYPE, RoutesManager.PointCloudEditor],
    [Assets.DataFactory.TYPE, RoutesManager.DataFactoryEditor],
    [Assets.DataInstance.TYPE, RoutesManager.DataInstanceEditor],
])
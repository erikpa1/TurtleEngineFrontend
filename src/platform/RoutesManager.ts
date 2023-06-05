const PREFIX_ASSETS = "/assets"
const PREFIX_PLAY = "/play"
const PREFIX_SCENE_EDITOR = "/scene-editor"
const PREFIX_MESH_EDITOR = "/mesh-editor"
const PREFIX_AREA_EDITOR = "/area-editor"
const PREFIX_MATERIAL_EDITOR = "/material-editor"
const PREFIX_POINTCLOUD_EDITOR = "/point-cloud-editor"
const PREFIX_PANORAMA_EDITOR = "/panorama-editor"

export default class RoutesManager {

    static ROUTE_PROJECTS = `/projects`

    static ROUTE_MANAGEMENT = `/management`

    static ROUTE_ASSETS = `/${PREFIX_ASSETS}/:projectuid`

    static ROUTE_PLAY = `/${PREFIX_PLAY}/:projectuid`

    static ROUTE_SCENE_EDITOR = `/${PREFIX_SCENE_EDITOR}/:projectuid/:sceneuid`

    static ROUTE_AREA_EDITOR = `/${PREFIX_AREA_EDITOR}/:projectuid`

    static ROUTE_MATERIAL_EDITOR = `/${PREFIX_MATERIAL_EDITOR}/:projectuid/:materialuid`
    static ROUTE_MESH_EDITOR = `/${PREFIX_MESH_EDITOR}/:projectuid/:meshuid`
    static ROUTE_POINTCLOUD_EDITOR = `/${PREFIX_POINTCLOUD_EDITOR}/:projectuid/:clouduid`
    static ROUTE_PANORAMA_EDITOR = `/${PREFIX_PANORAMA_EDITOR}/:projectuid/:panoramauid`

    static Assets(projectUid: string): string {
        return `${PREFIX_ASSETS}/${projectUid}`
    }

    static AreaEditor(projectUid: string): string {
        return `${PREFIX_AREA_EDITOR}/${projectUid}`
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
        return `${PREFIX_POINTCLOUD_EDITOR}/${projectUid}/${projectUid}`
    }

    static PanoramaEditor(projectUid: string, panoramaUid: string): string {
        return `${PREFIX_PANORAMA_EDITOR}/${projectUid}/${projectUid}`
    }

    static Play(projectUid: string): string {
        return `${PREFIX_PLAY}/${projectUid}`
    }


}
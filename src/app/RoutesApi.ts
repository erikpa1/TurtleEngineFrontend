export default class RoutesApi {

    static SCENES = `/p/:uid/scenes`
    static SCENE = `/p/:uid/scene/:uid`


    static GetSceneRoute(projectUid: string, scene_uid: string) {
        return `/p/${projectUid}/scene/${scene_uid}`
    }

    static GetScenesRoute(projectUid: string) {
        return `/p/${projectUid}/scenes`
    }


}
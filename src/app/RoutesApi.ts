export default class RoutesApi {

    static SCENES = `/p/:uid/scenes`


    static GetScenesRoute(projectUid: string) {
        return `/p/${projectUid}/scenes`
    }


}
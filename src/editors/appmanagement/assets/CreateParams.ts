import FsApi from "@api/FsApi";

export class CreatePanoramaAssetParams {

    project_uid = ""
    asset_uid = ""
    panorama_path: string

    constructor() {
        this.panorama_path = FsApi.GetPlatformPath("Panoramas/PreviewPanorama.jpg")
    }

}
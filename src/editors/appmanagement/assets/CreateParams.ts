import FsApi from "@api/FsApi";

export class UploadAssetFileParams {

    project_uid = ""
    folder = ""
    asset_type = ""
    asset_uid = ""
    path_from: string
    destination_name = ""

    constructor() {
        this.path_from = FsApi.GetPlatformPath("Panoramas/PreviewPanorama.jpg")
        this.destination_name = `Default.${FsApi.GetFileExtension(this.path_from)}`
    }

}
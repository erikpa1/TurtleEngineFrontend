import FsTools from "@api/FsTools";

export class UploadAssetFileParams {

    project_uid = ""
    folder = ""
    asset_type = ""
    asset_uid = ""
    path_from: string
    destination_name = ""

    constructor() {
        this.path_from = FsTools.GetPlatformPath("Panoramas/PreviewPanorama.jpg")
        this.destination_name = `Default.${FsTools.GetFileExtension(this.path_from)}`
    }

}
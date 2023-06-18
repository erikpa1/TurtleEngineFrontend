import AssetParent from "./AssetParent";

export default class PanoramaAsset extends AssetParent {
    static FOLDER = "Panoramas"
    static TYPE = "panorama"
    static LANG = "core.panorama"
    static LANG_PLURAL = "core.panoramas"

    FromJson(jObject: any) {
        super.FromJson(jObject)
    }

    GetFolderPath(): string {
        return `${this.parent_project_path}${PanoramaAsset.FOLDER}/${this.uid}/`
    }

    GetPreviewPath(): string {
        return `${this.parent_project_path}${PanoramaAsset.FOLDER}/${this.uid}/Preview.png`
    }

    GetFullPanoramaPath(): string {
        return `${this.parent_project_path}${PanoramaAsset.FOLDER}/${this.uid}/Default.${this.extension}`

    }

}
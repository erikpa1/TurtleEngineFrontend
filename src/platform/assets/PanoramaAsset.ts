import AssetParent from "./AssetParent";

export default class PanoramaAsset extends AssetParent {
    static FOLDER = "Panoramas"
    static TYPE = "panorama"
    static LANG = "core.panorama"
    static LANG_PLURAL = "core.panoramas"

    from_json(jObject: any) {
        super.from_json(jObject)
    }

    GetFullPanoramaPath(): string {
        return `${this.parent_project_path}${PanoramaAsset.FOLDER}/${this.uid}/Default.${this.extension}`

    }

}
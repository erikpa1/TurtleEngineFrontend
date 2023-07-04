import Asset, {AssetData} from "./Asset";

export default class PanoramaData extends AssetData {

    extension = "jpg"

    GetFolderPath(): string {
        return `${this._project_path}Assets/${this.uid}/`
    }

    GetFullPanoramaPath(): string {
        return `${this._project_path}Assets/${this.uid}/Default.${this.extension}`
    }

    ToJson(): any {
        return {
            ...super.ToJson(),
            extension: this.extension
        }
    }

    FromJson(context: any, data: any) {
        super.FromJson(context, data)

        this.extension = data.extension ?? this.extension
    }

}
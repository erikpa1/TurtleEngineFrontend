import {AssetData} from "@platform/assets/Asset";

export default class VideoData extends AssetData {

    video_extension = "mp4"

    GetEntryPath(): string {
        return `${this._project_path}Assets/${this.uid}/Default.${this.video_extension}`
    }

}
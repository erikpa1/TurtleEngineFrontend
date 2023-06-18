import MaterialAsset from "@platform/assets/MaterialAsset";
import MeshAsset from "@platform/assets/MeshAsset";
import PointCloudAsset from "@platform/assets/PointCloudAsset";
import VideoAsset from "@platform/assets/VideoAsset";
import ImageAsset from "@platform/assets/ImageAsset";
import QuizAsset from "@platform/assets/QuizAsset";
import PanoramaAsset from "@platform/assets/PanoramaAsset";
import AreaAsset from "@platform/assets/AreaAsset";
import SceneAsset from "@platform/assets/SceneAsset";
import SoundAsset from "@platform/assets/SoundAsset";
import FontAsset from "@platform/assets/FontAsset";

export const Assets = {
    Material: MaterialAsset,
    Mesh: MeshAsset,
    PointCloud: PointCloudAsset,
    Panorama: PanoramaAsset,
    Video: VideoAsset,
    Image: ImageAsset,
    Quiz: QuizAsset,
    Area: AreaAsset,
    Scene: SceneAsset,
    Sound: SoundAsset,
    Font: FontAsset,

    values: () => {
        return [
            Assets.Scene,
            Assets.Mesh,
            Assets.Video,
            Assets.Panorama,
            Assets.Material,
            Assets.PointCloud,
            Assets.Image,
            Assets.Quiz,
            Assets.Area,
            Assets.Sound,
            Assets.Font,

        ]
    }
}

export class AssetsManager {

    static FOLDER_TYPES_MAP: Map<string, string> = new Map(Assets.values().map((asset) => {
        return [asset.TYPE, asset.FOLDER]
    }))

    static GetFolderOnType(assetType: string): string {
        const tmp = AssetsManager.FOLDER_TYPES_MAP.get(assetType)
        if (tmp) {
            return tmp
        } else {
            return "Undefined"
        }
    }
}




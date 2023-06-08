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

    values: () => {
        return [
            Assets.Material,
            Assets.Mesh,
            Assets.PointCloud,
            Assets.Panorama,
            Assets.Video,
            Assets.Image,
            Assets.Quiz,
            Assets.Area,
            Assets.Scene,
            Assets.Sound

        ]
    }
}






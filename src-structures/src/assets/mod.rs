pub mod asset_parent;
pub mod asset_panorama;

use serde::{Serialize, Deserialize};
use serde_json;

use asset_panorama::{PanoramaAsset};

#[derive(Serialize, Deserialize, Debug)]
pub struct AssetParentLight {
    pub uid: String,

    #[serde(default)]
    pub name: String,

    pub assetType: String,

    #[serde(default)]
    pub description: String,

    #[serde(default)]
    pub extension: String,

    #[serde(default)]
    pub hasPreview: bool,


}

impl AssetParentLight {
    pub fn New() -> AssetParentLight {
        return AssetParentLight {
            uid: "".into(),
            name: "".into(),
            description: "".into(),
            extension: "".into(),
            assetType: "".into(),
            hasPreview: false,
        };
    }
}


pub struct AssetManager {}

impl AssetManager {
    pub fn GetAssetFolder(assetType: &String) -> String {
        if assetType == &PanoramaAsset::GetType() {
            return PanoramaAsset::GetFolder();
        } else {
            return "Undefinded".into();
        }
    }
}

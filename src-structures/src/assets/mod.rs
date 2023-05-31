use serde::{Serialize, Deserialize};
use serde_json;


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
use serde::{Serialize, Deserialize};
use serde_json;


#[derive(Serialize, Deserialize, Debug)]
pub struct TurtleAsset {
    pub uid: String,

    #[serde(default)]
    pub name: String,

    #[serde(rename = "type")]
    pub assetType: String,

    pub subtype: String,

    #[serde(default)]
    pub description: String,

    #[serde(default)]
    pub tags: String,

    #[serde(default)]
    pub extension: String,

    #[serde(default)]
    pub hasPreview: bool,

}

impl TurtleAsset {
    pub fn New() -> TurtleAsset {
        return TurtleAsset {
            uid: "".into(),
            name: "".into(),
            description: "".into(),
            tags: "".into(),
            extension: "".into(),
            assetType: "".into(),
            subtype: "".into(),
            hasPreview: false,
        };
    }
}




use serde::{Serialize, Deserialize};
use serde_json;

#[derive(Serialize, Deserialize, Debug)]
pub struct CreateAssetThumbnailParams {
    #[serde(default)]
    pub source_file: String,
    pub destination_file: String,

    pub maxWidth: u32,
}
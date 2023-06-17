use super::asset_parent::{AssetParent};

pub struct PanoramaAsset {}

impl PanoramaAsset {
    pub fn GetType() -> String {
        "panorama".into()
    }

    pub fn GetFolder() -> String {
        "Panoramas".into()
    }
}

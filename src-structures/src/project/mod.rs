use serde::{Serialize, Deserialize};
use serde_json;
use ts_rs::TS;


#[derive(Serialize, Deserialize, Debug)]
#[derive(TS)]
#[ts(export, export_to = "../src/api/project/params.ts")]
pub struct CreateProjectParams {
    #[serde(default)]
    pub name: String,

    #[serde(default)]
    pub uid: String,

    #[serde(default)]
    pub description: String,

    #[serde(default)]
    pub author: String,

    #[serde(default)]
    pub project_type: String,

    #[serde(default)]
    pub lat_lon: String,
}

#[derive(Serialize, Deserialize, Debug)]
#[derive(TS)]
#[ts(export, export_to = "../src/api/project/params.ts")]
pub struct CreateAssetParamas {
    #[serde(default)]
    pub name: String,

    #[serde(default)]
    pub uid: String,

    pub project_uid: String,

    #[serde(default)]
    pub extension: String,

    #[serde(default)]
    pub description: String,

    pub assetType: String,

}


#[derive(Serialize, Deserialize, Debug)]
#[derive(TS)]
#[ts(export, export_to = "../src/data/project/ProjectLight.ts")]
pub struct ProjectLight {
    #[serde(default)]
    pub name: String,

    #[serde(default)]
    pub uid: String,

    #[serde(default)]
    pub description: String,

    #[serde(default)]
    pub author: String,

    #[serde(default)]
    pub project_type: String,

    #[serde(default)]
    pub lat_lon: String,

    #[serde(default)]
    pub projectFolderPath: String,
}

impl ProjectLight {
    pub fn FromCreateParams(params: &CreateProjectParams) -> Self {
        return Self {
            uid: params.uid.clone(),
            name: params.name.clone(),
            author: params.author.clone(),
            lat_lon: params.lat_lon.clone(),
            project_type: params.project_type.clone(),
            description: params.description.clone(),
            projectFolderPath: "".into(),
        };
    }

    pub fn LoadFromJsonString(jsonString: &String) -> Self {
        return serde_json::from_str(jsonString).unwrap();
    }
}


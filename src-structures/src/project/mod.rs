use serde::{Serialize, Deserialize};
use ts_rs::TS;


#[derive(Serialize, Deserialize, Debug)]
#[derive(TS)]
#[ts(export, export_to = "../src/api/project/data.ts")]
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
        };
    }
}

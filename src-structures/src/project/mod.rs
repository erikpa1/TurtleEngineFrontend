use serde::Serialize;
use ts_rs::TS;


#[derive(TS)]
#[ts(export, export_to = "../../src/api/project/data.ts")]
pub struct CreateProjectParams {
    name: String,
    description: String,
    author: String,
}
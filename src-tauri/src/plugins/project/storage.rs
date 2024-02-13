use crate::app::AppStateMut;
use serde_json::{json, Value};
use std::path::Path;
use std::sync::Mutex;
use tauri::State;

use tauri;

use tfs;



#[tauri::command]
pub async fn InsertEntities(
    container: String,
    data: String,
    state: State<'_, Mutex<AppStateMut>>,
) -> Result<String, String> {
    let mut project = state.lock().unwrap();

    let data: Value = serde_json::from_str(&data).unwrap();

    if let Ok(()) = project.InsertEntity(&container, data) {
        return Ok("".into());
    } else {
        return Ok("".into());
    }
}

#[tauri::command]
pub async fn QueryEntities(
    container: String,
    query: String,
    state: State<'_, Mutex<AppStateMut>>,
) -> Result<String, String> {

    let project = state.lock().unwrap();

    let entities = project.QueryEntities(&container, &serde_json::from_str(&query).unwrap());


    return Ok(serde_json::to_string(&entities).unwrap());
}

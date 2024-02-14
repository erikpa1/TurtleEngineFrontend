use crate::app::AppStateMut;
use serde_json::{json, Value};
use std::array;
use std::path::Path;
use std::sync::Mutex;
use tauri::State;

use tauri;

use tfs;

#[tauri::command]
pub async fn InsertEntity(
    container: String,
    data: String,
    state: State<'_, Mutex<AppStateMut>>,
) -> Result<String, String> {
    let mut project = state.lock().unwrap();

    let data: Value = serde_json::from_str(&data).unwrap();

    if let None = data.as_object() {
        return Err("Entity is not an object".into());
    }

    if let Ok(()) = project.InsertEntity(&container, data) {
        return Ok("".into());
    } else {
        return Err("".into());
    }
}

#[tauri::command]
pub async fn InsertEntities(
    container: String,
    data: String,
    state: State<'_, Mutex<AppStateMut>>,
) -> Result<String, String> {
    let mut project = state.lock().unwrap();

    let data: Value = serde_json::from_str(&data).unwrap();

    if let Some(array) = data.as_array() {
        for element in array {
            if let Ok(()) = project.InsertEntity(&container, element.clone()) {
                //Nothing
            } else {
                println!("Failed to insert entity: {}", element);
            }
        }
    } else {
        return Err("Not an Array!".into());
    }
    return Ok("".into());
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

#[tauri::command]
pub async fn DeleteEntities(
    container: String,
    query: String,
    state: State<'_, Mutex<AppStateMut>>,
) -> Result<String, String> {
    let mut project = state.lock().unwrap();

    let query_value: Value = serde_json::from_str(&query).unwrap();

    project.DeleteEntities(&container, &query_value);


    return Ok("".into());
}

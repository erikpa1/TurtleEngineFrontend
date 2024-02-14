use crate::app::AppStateMut;
use futures::lock::Mutex;
use serde_json::{json, Value};
use tauri::State;

#[tauri::command]
pub async fn GetAllScenes(state: State<'_, Mutex<AppStateMut>>) -> Result<String, String> {
    // return Ok(serde_json::to_string(&res.as_array()).unwrap());
    return Ok("".into());
}

#[tauri::command]
pub async fn CreateScene(
    sceneData: String,
    state: State<'_, Mutex<AppStateMut>>,
) -> Result<String, String> {
    return Ok("".into());
}






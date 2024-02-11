use crate::app::AppState;
use serde_json::{json, Value};
use tauri::State;

#[tauri::command]
pub fn GetAllScenes(state: State<'_, AppState>) -> Result<String, String> {
    let mut data_val: std::sync::MutexGuard<'_, serde_json::Value> =
        state.activeProject.lock().unwrap();

    let res = data_val.get("scenes").unwrap_or(&json!([])).clone();

    return Ok(serde_json::to_string(&res.as_array()).unwrap());
}

#[tauri::command]
pub fn CreateScene(sceneData: String, state: State<'_, AppState>) -> Result<String, String> {
    let mut data_val: std::sync::MutexGuard<'_, serde_json::Value> =
        state.activeProject.lock().unwrap();

    let scene: Result<Value, serde_json::Error> = serde_json::from_str(&sceneData);


    return Ok("".into());
}

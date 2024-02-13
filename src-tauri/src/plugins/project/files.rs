use crate::app::AppStateMut;
use serde_json::json;
use std::sync::Mutex;
use tauri::State;

use tauri;

#[tauri::command]
pub async fn GetProjectFiles(
    extensions: Vec<String>,
    state: State<'_, Mutex<AppStateMut>>,
) -> Result<String, String> {
    let tmp = state.lock().unwrap();

    println!("Listing project: {}", &tmp.activeProjectFolder);

    let data = tfs::ListFilesWithMetadata(&tmp.activeProjectFolder, true);

    let result = serde_json::to_string(&data).unwrap();
    return Ok(result);
}

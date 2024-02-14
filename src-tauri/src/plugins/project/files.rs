use crate::app::AppStateMut;
use serde_json::json;
use std::sync::Mutex;
use tauri::State;

use tauri;

use std::collections::HashSet;

#[tauri::command]
pub async fn GetProjectFiles(
    extensions: String,
    state: State<'_, Mutex<AppStateMut>>,
) -> Result<String, String> {
    let tmp = state.lock().unwrap();

    let _extensions: HashSet<String> = serde_json::from_str(&extensions).unwrap();


    println!("Listing project: {}", &tmp.activeProjectFolder);

    let data = tfs::ListFilesWithMetadata(&tmp.activeProjectFolder, &_extensions, true);

    let result = serde_json::to_string(&data).unwrap();
    return Ok(result);
}

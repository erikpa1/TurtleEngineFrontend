use crate::app::AppStateMut;
use serde_json::{json, Value};
use std::path::Path;
use std::sync::Mutex;
use tauri::State;

use tauri;

use tfs;

#[tauri::command]
pub async fn SaveProject(state: State<'_, Mutex<AppStateMut>>) -> Result<bool, bool> {
    let st = state.lock().unwrap();

    let project_value = st.ToJson();
    tfs::SaveJson(&st.activeProjectPath, &project_value);

    return Ok(true);
}

#[tauri::command]
pub async fn ActivateProject(
    filePath: String,
    state: State<'_, Mutex<AppStateMut>>,
) -> Result<String, String> {
    let mut tmp = state.lock().unwrap();

    let parent_folder = Path::new(&filePath)
        .parent()
        .unwrap()
        .to_string_lossy()
        .to_string();

    let mut prj = tfs::GetJson(&filePath).unwrap_or(json!({}));
    let mut obj = prj.as_object_mut().unwrap();
    obj.insert(
        "project_folder".into(),
        serde_json::Value::String(parent_folder.clone()),
    );

    tmp.activeProject = prj;
    tmp.activeProjectPath = filePath.clone();
    tmp.activeProjectFolder = format!("{}{}", &parent_folder, "\\");

    return Ok(serde_json::to_string(&json!({
        "ok": true,
        "project_folder": parent_folder,
    }))
    .unwrap());
}

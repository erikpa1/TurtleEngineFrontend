use serde_json::json;
use tauri;

pub struct TurtleFile {
    pub name: String,
    pub path: String,
    pub modified_at: String,
    pub created_at: String,
    pub created_by: String,
    pub preview: String,
    pub canBeDeleted: String,
}


#[tauri::command]
pub fn GetProjectFiles(project_folder: String) -> String {
    let result = serde_json::to_string(&json!({})).unwrap();
    return result;
}

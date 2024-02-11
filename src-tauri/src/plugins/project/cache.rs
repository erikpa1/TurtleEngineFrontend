use serde_json::json;
use serde_json::Value;
use std::{env, fs, result};

use tfs;

pub fn AddProjectToCache(path: &String, name: &String, uid: &String) {
    let folder_to_write = format!("{}\\TurtleEngine\\", tfs::GetAppData());
    tfs::CreateFolders(&folder_to_write);
    let file_to_write = format!("{}projects.json", &folder_to_write);

    let mut files_array: Vec<Value> = vec![];

    if let Some(existing) = tfs::GetJson(&file_to_write) {
        if let Some(files) = existing.as_array() {
            files_array = files.clone();
        }
    }
  
    files_array.push(json!({
        "name": name,
        "uid": uid,
        "path": &path
    }));

    tfs::SaveJson(&file_to_write, &Value::Array(files_array));
}

pub fn GetProjectsCacheJson() -> String {
    tfs::FileToString(&format!(
        "{}\\TurtleEngine\\projects.json",
        tfs::GetAppData()
    ))
}

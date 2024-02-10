use serde_json::json;
use serde_json::Value;
use std::{env, fs, result};

use tfs;

pub fn AddProjectToCache(path: &String) {
    let folder_to_write = format!("{}\\TurtleEngine\\", tfs::GetAppData());
    tfs::CreateFolders(&folder_to_write);
    let file_to_write = format!("{}projects.json", &folder_to_write);

    let mut files_array: Vec<Value> = vec![];

    if let Some(existing) = tfs::GetJson(&file_to_write) {
        if let Some(files) = existing.as_array() {
            files_array = files.clone();
        }
    }
  

    files_array.push(json!({"path": &path}));

    tfs::SaveJson(&file_to_write,  serde_json::to_string(&files_array));
}

pub fn GetProjectsCacheJson() -> String {
    tfs::FileToString(&format!(
        "{}\\TurtleEngine\\projects.json",
        tfs::GetAppData()
    ))
}

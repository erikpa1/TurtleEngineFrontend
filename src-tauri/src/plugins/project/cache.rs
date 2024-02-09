use serde_json::json;
use std::{env, fs, result};

use tfs;

pub fn AddProjectToCache(path: &String) {
    let data_to_write = json!([{ "path": path }]);

    let folder_to_write = format!("{}\\TurtleEngine\\", tfs::GetAppData());

    tfs::CreateFolders(&folder_to_write);

    let file_to_write = format!("{}projects.json", &folder_to_write);

    fs::write(
        &file_to_write,
        serde_json::to_string(&data_to_write).unwrap(),
    );
}

pub fn GetProjectsCacheJson() -> String {
    tfs::FileToString(&format!("{}\\TurtleEngine\\projects.json", tfs::GetAppData()))
}

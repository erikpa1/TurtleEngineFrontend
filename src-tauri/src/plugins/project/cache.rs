use serde::{Deserialize, Serialize};
use serde_json::json;
use serde_json::Value;
use std::{env, fs, result};

use tfs;

#[derive(Serialize, Deserialize, Debug)]
pub struct ProjectCache {
    #[serde(default)]
    pub name: String,

    #[serde(default)]
    pub uid: String,

    #[serde(default)]
    pub path: String,

    #[serde(default)]
    pub exists: bool,
}

impl ProjectCache {
    pub fn new() -> Self {
        return ProjectCache {
            name: String::from(""),
            uid: String::from(""),
            path: String::from(""),
            exists: false,
        };
    }
}

pub fn GetCacheJsonPath() -> String {
    return format!("{}\\TurtleEngine\\projects.json", tfs::GetAppData());
}

pub fn AddProjectToCache(path: &String, uid: &String, name: &String) {
    let file_to_write = GetCacheJsonPath();
    tfs::CreateFolders(&file_to_write);

    let mut files_array: Vec<ProjectCache> = vec![];

    if let Some(existing) = tfs::GetGetTypedJson::<Vec<ProjectCache>>(&file_to_write) {
        files_array = existing;
    }

    let mut newCacheObject = ProjectCache::new();
    newCacheObject.name = name.clone();
    newCacheObject.uid = uid.clone();
    newCacheObject.path = path.clone();

    if let Some(element) = files_array.iter_mut().find(|x| &x.path == path) {
        println!("Found existing path: {}", element.path);

        element.name = newCacheObject.name.clone();
        element.uid = newCacheObject.name.clone();
    } else {
        files_array.push(newCacheObject);
    }

    tfs::SaveJson(&file_to_write, &serde_json::to_value(&files_array).unwrap());
}

pub fn RemoveProjectFromCache(path: &String) {
    println!("Going to remove: [{}] from cache", path);

    let jsonPath = GetCacheJsonPath();

    let json_string = tfs::FileToString(&jsonPath);

    let mut cache: Vec<ProjectCache> = serde_json::from_str(&json_string).unwrap();

    cache.retain(|el| &el.path != path);

    tfs::SaveJson(&jsonPath, &json!(&cache));
}

pub fn GetProjectsCacheJsonString() -> String {
    let json_string = tfs::FileToString(&format!(
        "{}\\TurtleEngine\\projects.json",
        tfs::GetAppData()
    ));

    let mut cache: Vec<ProjectCache> = serde_json::from_str(&json_string).unwrap();

    for project in &mut cache {
        project.exists = tfs::Exists(&project.path);
    }

    return serde_json::to_string(&cache).unwrap();
}

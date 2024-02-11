use std::borrow::BorrowMut;
use std::fmt::format;
use std::path::Path;
use std::sync::Mutex;
use std::{fs, result};

use rusqlite::Connection;

use serde::de::Unexpected::Str;

use tauri::api::file;
use uuid::Uuid;

use tauri::plugin::{Builder, TauriPlugin};
use tauri::{Runtime, State};

use tfs;
use tstructures::project::{CreateProjectParams, ProjectLight};

use serde_json;
use serde_json::json;

use crate::database;

use crate::app::{AppState, DbTest};
use crate::database::FixProject;

mod cache;
mod scenes;
mod files;

#[tauri::command]
async fn CreateProject(projectJson: String) -> String {
    let mut createParams: CreateProjectParams = serde_json::from_str(&projectJson).unwrap();

    createParams.uid = format!("p-{}", Uuid::new_v4().to_string());

    println!("--------");
    println!("{}", tfs::GetExePath());
    println!("{}", tfs::GetProjectsPath());

    let projectFolder = &createParams.folder;

    if tfs::FolderEmpty(&projectFolder) {
        println!("Creating project folder: {}", &projectFolder);

        let mut projectLight = createParams.ToJson();

        let target_file = format!("{}\\{}.turtle", projectFolder, createParams.name);

        tfs::SaveJson(&target_file, &projectLight);
        cache::AddProjectToCache(&target_file, &createParams.uid, &createParams.name);
        return String::from(createParams.uid);
    } else {
        println!("Directory is not empty");
    }

    return String::from("");
}

#[tauri::command]
async fn DeleteProject(uid: String) -> String {
    let projectFolder = format!("{}{}/", tfs::GetProjectsPath(), uid);

    tfs::DeleteFolder(&projectFolder);

    return String::from("success");
}

#[tauri::command]
async fn ListProjects() -> String {
    return cache::GetProjectsCacheJsonString();
}

#[tauri::command]
async fn DeleteCached(filePath: String) -> bool {
    cache::RemoveProjectFromCache(&filePath);
    return true;
}

#[tauri::command]
async fn GetActiveProject(filePath: String, state: State<'_, AppState>) -> Result<String, String> {
    let mut data_val: std::sync::MutexGuard<'_, serde_json::Value> =
        state.activeProject.lock().unwrap();

    let clon = data_val.clone();

    let res = serde_json::to_string(&clon).unwrap();

    return Ok(res);
}

#[tauri::command]
async fn ActivateProject(filePath: String, state: State<'_, AppState>) -> Result<String, String> {
    let mut data_val: std::sync::MutexGuard<'_, serde_json::Value> =
        state.activeProject.lock().unwrap();
    *data_val = tfs::GetJson(&filePath).unwrap_or(json!({}));

    let mut path_string: std::sync::MutexGuard<'_, String> =
        state.activeProjectPath.lock().unwrap();
    *path_string = filePath.clone();

    let parent_folder = Path::new(&filePath)
        .parent()
        .unwrap()
        .to_string_lossy()
        .to_string();

    return Ok(serde_json::to_string(&json!({
        "ok": true,
        "project_folder": parent_folder,
    }))
    .unwrap());
}

pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("turtle_projects")
        .invoke_handler(tauri::generate_handler![
            CreateProject,
            ActivateProject,
            DeleteProject,
            ListProjects,
            DeleteCached,
            GetActiveProject,
            scenes::GetAllScenes,
            files::GetProjectFiles,
        ])
        .build()
}

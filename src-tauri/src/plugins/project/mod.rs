use std::borrow::BorrowMut;
use std::fmt::format;
use std::path::Path;
use std::sync::Mutex;
use std::{fs, result};

use rusqlite::types::Value;
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

use crate::app::AppStateMut;
use crate::database::FixProject;

mod _project;
mod cache;
mod files;
mod scenes;
mod storage;


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
async fn GetActiveProject(state: State<'_, Mutex<AppStateMut>>) -> Result<String, String> {
    let tmp = state.lock().unwrap();

    println!("Active project: {}", &tmp.activeProjectPath);

    if tmp.activeProjectPath != "" {
        let res = serde_json::to_string(&tmp.activeProject).unwrap();
        return Ok(res);
    } else {
        return Err("No active project".into());
    }
}


#[tauri::command]
async fn Test(filePath: String, state: State<'_, Mutex<AppStateMut>>) -> Result<String, String> {
    println!("Here");
    println!("{}", filePath);

    return Err("Success".into());
}

pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("turtle_projects")
        .invoke_handler(tauri::generate_handler![
            CreateProject,
            DeleteProject,
            ListProjects,
            DeleteCached,
            GetActiveProject,
            Test,
            scenes::GetAllScenes,
            files::GetProjectFiles,
            _project::SaveProject,
            _project::ActivateProject,
        ])
        .build()
}

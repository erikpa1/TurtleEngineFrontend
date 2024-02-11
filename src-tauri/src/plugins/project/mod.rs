use std::borrow::BorrowMut;
use std::fmt::format;
use std::sync::Mutex;
use std::{fs, result};

use rusqlite::Connection;

use serde::de::Unexpected::Str;

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

#[tauri::command]
async fn CreateProject(projectJson: String) -> String {
    let mut createParams: CreateProjectParams = serde_json::from_str(&projectJson).unwrap();

    createParams.uid = format!("p-{}", Uuid::new_v4().to_string());

    println!("--------");
    println!("{}", tfs::GetExePath());
    println!("{}", tfs::GetProjectsPath());

    let projectFolder = &createParams.folder;

    let turtle_projects =
        tfs::FindFilesWithExtension(&projectFolder, &String::from("turtle"), true);

    println!("{}", turtle_projects.len());

    if turtle_projects.len() == 0 {
        println!("Creating project folder: {}", &projectFolder);

        let mut projectLight = createParams.ToJson();

        let target_file = format!("{}\\{}.turtle", projectFolder, createParams.name);

        if tfs::Exists(&target_file) {
        } else {
            tfs::SaveJson(&target_file, &projectLight);
            cache::AddProjectToCache(&target_file, &createParams.uid, &createParams.name);
            return String::from(createParams.uid);
        }
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
    return cache::GetProjectsCacheJson();
}

#[tauri::command]
async fn ActivateLastProject(state: State<'_, AppState>) -> Result<String, String> {
    // let activeProjectUid = state.activeProjectUid.lock().unwrap();
    //
    // if (activeProjectUid != "") {
    //     return Ok(tfs::FileToString(&format!("{}{}/project_light.json", tfs::GetProjectsPath(), &activeProjectUid)))
    // } else {
    //     return Err("".into());
    // }
    return Err("Not found".into());
}

#[tauri::command]
async fn GetAndActivateProject(
    state: State<'_, AppState>,
    projectUid: String,
) -> Result<(), String> {
    let dbPath = format!("{}{}/project.db", tfs::GetProjectsPath(), projectUid);

    let connRes = database::CreateDatabaseConnection(&dbPath);
    let conn = connRes.unwrap();

    FixProject(&conn);

    state.SetSqlLiteConnection(conn);
    state.SetActiveProjectUid(projectUid);
    state.SetActiveProjectDbPah(dbPath);

    return Ok(());
}

#[tauri::command]
async fn GetActiveProject(state: State<'_, AppState>) -> Result<String, String> {
    return Ok(state.activeProjectUid.lock().unwrap().clone());
}

pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("turtle_projects")
        .invoke_handler(tauri::generate_handler![
            GetAndActivateProject,
            CreateProject,
            ActivateLastProject,
            DeleteProject,
            ListProjects,
        ])
        .build()
}

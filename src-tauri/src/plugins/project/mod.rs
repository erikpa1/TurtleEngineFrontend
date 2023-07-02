use std::borrow::BorrowMut;
use std::fmt::format;
use std::{fs, result};
use std::sync::Mutex;


use rusqlite::{Connection};

use serde::de::Unexpected::Str;

use uuid::{Uuid};

use tauri::{Runtime, State};
use tauri::plugin::{Builder, TauriPlugin};


use tfs;
use tstructures::project::{CreateProjectParams, ProjectLight};

use serde_json;
use serde_json::json;

use crate::database;

use crate::app::{AppState, DbTest};
use crate::database::FixProject;


#[tauri::command]
async fn CreateProject(projectJson: String) -> String {
    let mut createParams: CreateProjectParams = serde_json::from_str(&projectJson).unwrap();
    createParams.uid = Uuid::new_v4().to_string();


    let projectFolder = format!("{}{}/", tfs::GetProjectsPath(), createParams.uid);

    let dbPath = format!("{}/project.db", projectFolder);

    tfs::CreateFolders(&projectFolder);

    let connRes = database::CreateDatabaseConnection(&dbPath);

    if let Ok(conn) = connRes {
        FixProject(&conn);

        conn.close();

        let lightProject = ProjectLight::FromCreateParams(&createParams);

        fs::write(format!("{}/project_light.json", projectFolder), serde_json::to_string(&lightProject).unwrap());
    } else {
        println!("Failed to create database: {}", &dbPath);
    }


    return String::from(createParams.uid);
}


#[tauri::command]
async fn DeleteProject(uid: String) -> String {
    let projectFolder = format!("{}{}/", tfs::GetProjectsPath(), uid);

    tfs::DeleteFolder(&projectFolder);

    return String::from("success");
}


#[tauri::command]
async fn ListProjects() -> String {
    let paths = tfs::ListFolders(&tfs::GetProjectsPath());

    let mut resultJsons: Vec<ProjectLight> = Vec::new();

    for folder in &paths {
        println!("{}", folder);

        if tfs::CheckProjectExistenceAndValidity(folder) {
            let lightDataStr = tfs::FileToString(&format!("{}project_light.json", folder));

            let mut lightDataResult: serde_json::Result<ProjectLight> = serde_json::from_str(&lightDataStr);

            if let Ok(mut lightData) = lightDataResult {
                lightData.projectFolderPath = folder.clone();
                resultJsons.push(lightData);
            }
        }
    }

    let resultValue = json!({"projects": resultJsons});

    return serde_json::to_string(&resultValue).unwrap_or("\"projects\": []".into());
}


#[tauri::command]
async fn GetProjectLight(projectUid: String) -> String {
    let projectFolder = tfs::GetProjectsPath();

    let lightDataStr = tfs::FileToString(&format!("{}{}\\project_light.json", projectFolder, projectUid));

    let mut lightDataResult: serde_json::Result<ProjectLight> = serde_json::from_str(&lightDataStr);

    if let Ok(mut lightData) = lightDataResult {
        lightData.projectFolderPath = format!("{}{}\\", projectFolder, projectUid);

        return serde_json::to_string(&lightData).unwrap_or("{}".into());
    }

    return "{}".into();
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
async fn GetAndActivateProject(state: State<'_, AppState>, projectUid: String) -> Result<(), String> {
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
            GetProjectLight,
        ])
        .build()
}
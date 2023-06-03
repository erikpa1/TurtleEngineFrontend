use std::borrow::BorrowMut;
use std::fmt::format;
use std::fs;
use std::sync::Mutex;


use rusqlite::{Connection, Result};

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

    tfs::CreateFolders(&dbPath);

    let connRes = database::CreateDatabaseConnection(&dbPath);

    if let Ok(conn) = connRes {

        FixProject(&conn);

        conn.close();

        let lightProject = ProjectLight::FromCreateParams(&createParams);

        fs::write(format!("{}/project_light.json", projectFolder), serde_json::to_string(&lightProject).unwrap());
    } else {
        println!("Failed to create database: {}", &dbPath);
    }


    return String::from("success");
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

            let lightDataResult = serde_json::from_str(&lightDataStr);

            if let Ok(lightData) = lightDataResult {
                resultJsons.push(lightData);
            }
        }
    }

    let resultValue = json!({"projects": resultJsons});

    return serde_json::to_string(&resultValue).unwrap_or("\"projects\": []".into());
}


#[tauri::command]
async fn GetProjectLight(projectUid: String) -> String {
    return tfs::FileToString(&format!("{}{}/project_light.json", tfs::GetProjectsPath(), projectUid));
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


#[tauri::command]
async fn UploadProjectLightData(projectJson: String) -> bool {
    let mut createParams: CreateProjectParams = serde_json::from_str(&projectJson).unwrap();

    let projectFolder = format!("{}{}", tfs::GetProjectsPath(), &createParams.uid);

    let jsonDataPath = format!("{}/project_light.json", &projectFolder);

    let mut lightProject = ProjectLight::LoadFromJsonString(&tfs::FileToString(&jsonDataPath));

    lightProject.name = createParams.name.clone();
    lightProject.author = createParams.author.clone();
    lightProject.description = createParams.description.clone();
    lightProject.lat_lon = createParams.lat_lon.clone();

    fs::write(jsonDataPath, serde_json::to_string(&lightProject).unwrap());
    return true;
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
            UploadProjectLightData,
        ])
        .build()
}
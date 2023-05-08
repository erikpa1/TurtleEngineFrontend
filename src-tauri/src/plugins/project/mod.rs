use std::fmt::format;
use std::fs;
use rusqlite::{Connection, Result};
use serde::de::Unexpected::Str;

use uuid::{Uuid};

use tauri::{Runtime};
use tauri::plugin::{Builder, TauriPlugin};


use tfs;
use tstructures::project::{CreateProjectParams, ProjectLight};

use serde_json;
use serde_json::json;


#[tauri::command]
async fn CreateProject(projectJson: String) -> String {
    let mut createParams: CreateProjectParams = serde_json::from_str(&projectJson).unwrap();
    createParams.uid = Uuid::new_v4().to_string();


    let projectFolder = format!("{}{}/", tfs::GetProjectsPath(), createParams.uid);

    let dbPath = format!("{}/project.db", projectFolder);

    tfs::CreateFolders(&dbPath);

    let connRes = Connection::open(dbPath.clone());

    if let Ok(conn) = connRes {
        conn.execute(
            "CREATE TABLE IF NOT EXISTS Scenes (
             Uid text primary key,
             Name text,
             PanoramaUid text;
         )",
            [],
        );

        conn.execute(
            "CREATE TABLE IF NOT EXISTS Assets (
             Uid text primary key,
             Name text,
             Type text,
             Extension text;
         )",
            [],
        );

        conn.close();

        let lightProject = ProjectLight::FromCreateParams(&createParams);

        fs::write(format!("{}/project_light.json", projectFolder), serde_json::to_string(&lightProject).unwrap());
    }


    return String::from("success");
}


#[tauri::command]
async fn ListProjects() -> String {
    let paths = tfs::ListFolders(&tfs::GetProjectsPath());


    let mut resultJsons: Vec<ProjectLight> = Vec::new();

    for folder in &paths {
        println!("{}", folder);


        if (tfs::CheckProjectExistenceAndValidity(folder)) {
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
            CreateProject,
            ListProjects,
            GetProjectLight,
            UploadProjectLightData
        ])
        .build()
}
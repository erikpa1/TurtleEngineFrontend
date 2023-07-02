mod params;

use std::borrow::BorrowMut;
use std::fmt::format;
use std::fs;
use std::path::Path;

use futures::lock::Mutex;

use rusqlite::{Connection, Result};
use rusqlite::ffi::sqlite3;

use uuid::{Uuid};

use tauri::{Runtime, State};
use tauri::plugin::{Builder, TauriPlugin};

use tfs;
use tstructures::project::{CreateAssetParamas, UploadAssetFileParams};


use tstructures::assets::{TurtleAsset};

use serde_json;
use serde_json::json;
use tfs::{CreateFolders, GetProjectsPath};
use crate::app::AppState;

use crate::database;


#[tauri::command]
pub async fn UploadAssetFile(state: State<'_, AppState>, createJson: String) -> Result<String, String> {
    let mut createParams: UploadAssetFileParams = serde_json::from_str(&createJson).unwrap();

    let assetFolder = format!("{}{}\\{}\\{}\\",
                              GetProjectsPath(),
                              createParams.project_uid,
                              "Assets",
                              createParams.asset_uid);
    CreateFolders(&assetFolder);

    let destinationPath = format!("{}{}", assetFolder, createParams.destination_name);

    println!("Creating folder: {}", assetFolder);
    println!("Copying from: {}", createParams.path_from);
    println!("Copying to: {}", &destinationPath);

    println!("{:?}", fs::copy(&createParams.path_from, &destinationPath));

    return Ok(destinationPath);
}


#[tauri::command]
pub async fn GetAllAssetsOfType(state: State<'_, AppState>, project_uid: String, asset_type: String) -> Result<String, ()> {
    // let mapLock = state.test.lock().unwrap();
    // let map = mapLock.as_mut().unwrap();
    //
    // map.insert("Test".into(), "value".into());
    //
    let dbPath = state.activeProjectDbPath.lock().unwrap().clone();
    let mut dbc = database::CreateDatabaseConnection(&dbPath).unwrap();

    let query = format!(
        "SELECT Uid, Name, Type, SubType, Tags, Description, HasPreview from Assets WHERE Type='{}'", asset_type
    );

    let mut statement = dbc.prepare(&query).unwrap();

    let rows_iter = statement.query_map([], |row| {
        let mut tmp = TurtleAsset::New();

        tmp.uid = row.get(0).unwrap_or("".into());
        tmp.name = row.get(1).unwrap_or("".into());
        tmp.assetType = row.get(2).unwrap_or("".into());
        tmp.subtype = row.get(3).unwrap_or("".into());
        tmp.tags = row.get(4).unwrap_or("".into());
        tmp.description = row.get(5).unwrap_or("".into());

        tmp.hasPreview = if row.get(6).unwrap_or(0) == 0 {
            false
        } else {
            true
        };


        return Ok(tmp);
    }).unwrap();

    let mut result: Vec<TurtleAsset> = vec![];

    for myRow in rows_iter {
        if let Ok(lightAsset) = myRow {
            result.push(lightAsset);
        }
    }

    let resultValue = json!({"assets": result});

    let resString = serde_json::to_string(&resultValue)
        .unwrap_or("\"assets\": []".into());

    return Ok(resString);
}


#[tauri::command]
pub async fn DeleteAssetWithUid(state: State<'_, AppState>, project_uid: String, asset_uid: String) -> Result<String, ()> {
    let dbPath = state.activeProjectDbPath.lock().unwrap().clone();
    let mut dbc = database::CreateDatabaseConnection(&dbPath).unwrap();

    let query = format!(
        "DELETE from Assets WHERE Uid='{}'", asset_uid
    );

    dbc.execute(&query, []).unwrap();


    return Ok("".into());
}

#[tauri::command]
pub async fn GetAsset(state: State<'_, AppState>, project_uid: String, asset_uid: String) -> Result<String, ()> {
    let dbPath = state.activeProjectDbPath.lock().unwrap().clone();
    let mut dbc = database::CreateDatabaseConnection(&dbPath).unwrap();

    let query = format!(
        "SELECT Uid, Name, Type, SubType,Tags, Description, HasPreview from Assets WHERE Uid='{}'", asset_uid
    );

    let mut statement = dbc.prepare(&query).unwrap();

    let rows_iter = statement.query_map([], |row| {
        let mut tmp = TurtleAsset::New();

        tmp.uid = row.get(0).unwrap_or("".into());
        tmp.name = row.get(1).unwrap_or("".into());
        tmp.assetType = row.get(2).unwrap_or("".into());
        tmp.subtype = row.get(3).unwrap_or("".into());

        tmp.hasPreview = if row.get(4).unwrap_or(0) == 0 {
            false
        } else {
            true
        };

        return Ok(tmp);
    }).unwrap();

    let mut result: Vec<TurtleAsset> = vec![];

    for myRow in rows_iter {
        if let Ok(lightAsset) = myRow {
            result.push(lightAsset);
        }
    }

    let tmp = &result[0];

    let resultValue = json!(tmp);

    let resString = serde_json::to_string(&resultValue)
        .unwrap_or("\"assets\": []".into());

    return Ok(resString);
}


#[tauri::command]
pub async fn UploadAssetLight(state: State<'_, AppState>, jsonString: String) -> Result<(), String> {
    let mut assetLight: TurtleAsset = serde_json::from_str(&jsonString).unwrap();

    let dbPath = state.activeProjectDbPath.lock().unwrap().clone();
    println!("Uploading asset");

    let mut dbc = database::CreateDatabaseConnection(&dbPath).unwrap();
    database::UpdateAsset(&dbc, &assetLight);

    return Ok(());
}


pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("turtle_assets")
        .invoke_handler(tauri::generate_handler![
            GetAllAssetsOfType,
            GetAsset,
            DeleteAssetWithUid,
            UploadAssetFile,
            UploadAssetLight,
            GetAsset
        ])
        .build()
}
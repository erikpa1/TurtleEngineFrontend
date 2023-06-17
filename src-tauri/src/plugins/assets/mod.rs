mod imops;

use std::borrow::BorrowMut;
use std::fmt::format;
use std::fs;

use futures::lock::Mutex;

use rusqlite::{Connection, Result};
use rusqlite::ffi::sqlite3;

use uuid::{Uuid};

use tauri::{Asset, Runtime, State};
use tauri::plugin::{Builder, TauriPlugin};

use tfs;
use tstructures::project::{CreateAssetParamas, CreatePanoramaAssetParams};


use tstructures::assets::{AssetManager, AssetParentLight};

use serde_json;
use serde_json::json;
use tfs::{CreateFolders, GetProjectsPath};
use crate::app::AppState;

use crate::database;


#[tauri::command]
pub async fn CreateAsset(state: State<'_, AppState>, createJson: String) -> Result<String, String> {
    let mut createParams: CreateAssetParamas = serde_json::from_str(&createJson).unwrap();

    let dbPath = state.activeProjectDbPath.lock().unwrap().clone();

    let mut dbc = database::CreateDatabaseConnection(&dbPath).unwrap();

    let uid = database::CreateAsset(&dbc, &createParams);

    return Ok(uid.unwrap());
}

#[tauri::command]
pub async fn CreatePanoramaAsset(state: State<'_, AppState>, createJson: String) -> Result<(), String> {
    let mut createParams: CreatePanoramaAssetParams = serde_json::from_str(&createJson).unwrap();

    let panoramaFolder = format!("{}{}\\Panoramas\\{}\\", GetProjectsPath(), createParams.project_uid, createParams.asset_uid);

    CreateFolders(&panoramaFolder);

    let copyFile = format!("{}Default.jpg", panoramaFolder);


    println!("Creating folder: {}", panoramaFolder);
    println!("Copying from: {}", createParams.panorama_path);
    println!("Copying to: {}", copyFile);

    println!("{:?}", fs::copy(createParams.panorama_path, copyFile));


    return Ok(());
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
        "SELECT Uid, Name, Type from Assets WHERE Type='{}'", asset_type
    );

    let mut statement = dbc.prepare(&query).unwrap();

    let rows_iter = statement.query_map([], |row| {
        let mut tmp = AssetParentLight::New();

        tmp.uid = row.get(0).unwrap_or("".into());
        tmp.name = row.get(1).unwrap_or("".into());
        tmp.assetType = row.get(2).unwrap_or("".into());

        return Ok(tmp);
    }).unwrap();

    let mut result: Vec<AssetParentLight> = vec![];

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
pub async fn GetAsset(state: State<'_, AppState>, project_uid: String, asset_type: String, asset_uid: String) -> Result<String, ()> {
    let assetFolder = AssetManager::GetAssetFolder(&asset_type);

    let assetFolder = format!("{}{}\\{}\\{}\\", tfs::GetProjectsPath(), project_uid, assetFolder, asset_uid);

    let jsonFile = format!("{}{}", assetFolder, "Default.json");

    let fileStreamResult = fs::read(jsonFile);

    if let Ok(stream) = fileStreamResult {
        let returnStr = String::from_utf8(stream).unwrap_or("{}".into());
        println!("{}", returnStr);
        return Ok(returnStr);
    } else {
        return Ok("{}".into());
    }
}


pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("turtle_assets")
        .invoke_handler(tauri::generate_handler![
            CreateAsset,
            GetAllAssetsOfType,
            DeleteAssetWithUid,
            CreatePanoramaAsset,
            GetAsset
        ])
        .build()
}